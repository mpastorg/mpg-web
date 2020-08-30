pipeline {
  agent {
        docker {
            image 'node:lts-alpine' 
        }
    }
  stages {
    stage('stage1') {
      steps {
        sh 'echo "Hola build $BUILD_NUMBER"'
      }
    }

  }
}
