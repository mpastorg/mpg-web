pipeline {
  agent { dockerfile true }
  stages {
    stage('stage1') {
      steps {
        sh 'node --version'
        sh 'echo "Hola build $BUILD_NUMBER"'
      }
    }

  }
}
