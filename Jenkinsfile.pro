pipeline {
  agent any
  environment {
    RELEASE = '0.3'
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
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi mpastorg/mpg-vuejs:$RELEASE.$BUILD_NUMBER"
      }
    }  
  }
}
