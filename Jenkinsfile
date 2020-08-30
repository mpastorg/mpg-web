pipeline {
  agent { dockerfile true }
  stages {
    stage('stage1') {
      steps {
        sh 'echo "Hola build $BUILD_NUMBER"'
      }
    }

  }
}
