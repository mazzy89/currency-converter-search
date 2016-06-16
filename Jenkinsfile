#!groovy
node {

  stage "Checkout"
  git url: "https://github.com/mazzy89/currency-converter-search.git"

  // We are pushing to a private secure ECR docker registry
  // 'ecr:id' is the username/password credentials ID as defined in Jenkins Credentials.
  // This is used to authenticate the Docker client to the registry.
  docker.withRegistry("https://264721266761.dkr.ecr.us-east-1.amazonaws.com", "ecr:2bfe1664-ca6a-4a35-8b60-89f133cb8e98") {

    stage "Build"
    def currencyConvSearchImg = docker.build("microservices/currency-converter-search:${env.BUILD_TAG}")

    stage "Push & Tag"
    // Let us tag and push the newly built image. Will tag using the image name provided
    // in the 'docker.build' call above (which included the build number on the tag).
    currencyConvSearchImg.push("latest")
  }

  stage "Register Task"
  sh "aws ecs register-task-definition --cli-input-json file://currency-converter-search-task.json"
}
