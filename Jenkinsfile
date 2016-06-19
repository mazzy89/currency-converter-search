#!groovy
node {

  stage "Checkout"
  git url: "https://github.com/mazzy89/currency-converter-search.git", branch: "develop"

  // We are pushing to a private secure ECR docker registry
  // 'ecr:id' is the username/password credentials ID as defined in Jenkins Credentials.
  // This is used to authenticate the Docker client to the registry.
  docker.withRegistry("https://264721266761.dkr.ecr.us-east-1.amazonaws.com", "ecr:2bfe1664-ca6a-4a35-8b60-89f133cb8e98") {

    stage "Build"
    def currencyConvSearchImg = docker.build("currency-converter/search:${env.BUILD_NUMBER}")

    // TODO: place here a test

    stage "Push & Tag"
    // Let us tag and push the newly built image. Will tag using the image name provided
    // in the 'docker.build' call above (which included the build number on the tag).
    currencyConvSearchImg.push("${env.BUILD_NUMBER}")
  }

  def AWS = "/usr/local/bin/aws"

  // Create a new task definition for this build
  stage "Create & Register Task"
  sh "sed -e \"s;BUILD_NUMBER;${env.BUILD_NUMBER};g\" task-blueprint.json > currency-converter-search-task-${env.BUILD_NUMBER}.json"
  sh "${AWS} ecs register-task-definition --family currency-converter-search --cli-input-json file://currency-converter-search-task-${env.BUILD_NUMBER}.json"

  // Update the service
  stage "Update Service"
  def SERVICE_NAME = "currency-converter-search-srv"
  def TASK_FAMILY = "currency-converter-search"

  sh "${AWS} ecs describe-task-definition --task-definition currency-converter-search | jq .taskDefinition.revision > task_revision"
  def TASK_REVISION = readFile('task_revision').trim()

  sh "${AWS} ecs describe-services --services ${SERVICE_NAME} | jq .services[0].desiredCount > desired_count"
  def DESIRED_COUNT = readFile('desired_count').trim().toInteger()
  if (DESIRED_COUNT == 0) {
    DESIRED_COUNT = 1
  }

  sh "${AWS} ecs update-service --cluster default --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${TASK_REVISION} --desired-count ${DESIRED_COUNT}"
}
