pipeline {
  //agent any
  environment {
    RELEASE = '0.3'
    registry = "mpastorg/mpg-vuejs"
    registryCredential = 'dockerhub'
  }
  agent {
    // Equivalent to "docker build -f Dockerfile.build --build-arg version=1.0.2 ./build/
    dockerfile {
        additionalBuildArgs  '--build-arg version=$RELEASE.$BUILD_NUMBER'
    }
}
  stages {
    stage('stage1') {
      steps {
        //sh 'node --version'
        sh 'echo "Hola build: $RELEASE.$BUILD_NUMBER"'
      }
    }

  }
}
