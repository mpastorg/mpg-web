pipeline {
  agent any
  #agent { dockerfile true }
  environment {
    RELEASE = '0.2'
  }
  stages {
    stage('stage1') {
      steps {
        sh 'node --version'
        sh 'echo "Hola build: $RELEASE.$BUILD_NUMBER"'
      }
    }

  }
}
