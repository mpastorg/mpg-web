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
  }
  stages {
    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
      steps {
        script {
          dockerImage = docker.build("mpastorg/mpg-vuejs:$RELEASE.$BUILD_NUMBER")
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
  /*  stage('Deploy on kubernetes') {
      steps {
          kubernetesDeploy(
              kubeconfigId: '1c99e9a6-3159-41f1-a7d3-2e4dbbe13455',
              configs: 'strava-nginx-deplo.yml',
              enableConfigSubstitution: true
          )
      }
    }
  */
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi mpastorg/mpg-vuejs:$RELEASE.$BUILD_NUMBER"
      }
    }  
  }
}
