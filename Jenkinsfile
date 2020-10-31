pipeline {
  agent any
  environment {
    ENV = 'pre'
    HTTP_PORT = '32209'
    HTTPS_PORT = '32206'
    RELEASE = '0.4'
    registry = "mpastorg/mpg-vuejs"
    registryCredential = 'dockerhub'
    dockerImage = ''
    MPGCONFIGNGINX = '7fdg5kmmhd'
    MPGCONFIGVUE = '9kgc8t6g4m'
  }
  stages {
    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
      steps {
        script {
          dockerImage = docker.build("mpastorg/mpg-vuejs:$RELEASE.$ENV.$BUILD_NUMBER")
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('prepare for kubernetes') {
      steps{
        sh "sed 's/MPGENV/pre/' strava-java-athlete-friends.yml > deplo_1.yml"
        sh "sed 's/MPGRELEASE.MPGENV.MPGBUILD_NUMBER/$RELEASE.$ENV.$BUILD_NUMBER/' deplo_1.yml > deplo_1b.yml"
        sh "sed 's/MPGCONFIGNGINX/$MPGCONFIGNGINX/' deplo_1b.yml > deplo_2.yml"
        sh "sed 's/MPGCONFIGVUE/$MPGCONFIGVUE/' deplo_2.yml > deplo_2b.yml"
      }
    }
    stage('SSH Into k8s Server') {
      steps{
        script{
            def remote = [:]
            remote.name = 'mpg4ras01'
            remote.host = 'mpg4ras01'
            remote.allowAnyHosts = true
            withCredentials([usernamePassword(credentialsId: 'mpgubumac01', usernameVariable: 'USERNAME'
            , passwordVariable: 'PASSWORD')])
            {
                remote.user = "$USERNAME"
                remote.password = "$PASSWORD"
                sshPut remote: remote, from: 'deplo_2b.yml', into: '.'
                sshCommand remote: remote, command: "kubectl apply -f deplo_2b.yml"
                sshRemove remote: remote, path: 'deplo_2b.yml'
            }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi mpastorg/mpg-vuejs:$RELEASE.$BUILD_NUMBER"
      }
    }  
  }
}
