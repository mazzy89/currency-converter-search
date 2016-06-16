#!groovy
node {

  stage 'Checkout'
  git url: "https://github.com/mazzy89/currency-converter-search.git"

  docker.withRegistry("https://264721266761.dkr.ecr.us-east-1.amazonaws.com", "ecr:2bfe1664-ca6a-4a35-8b60-89f133cb8e98") {

    stage 'Build'
    def currencyConvSearch = docker.build("microservices/currency-converter-search:${env.BUILD_TAG}")

    stage 'Push'
    currencyConvSearch.push()
  }
}
