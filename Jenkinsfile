#!groovy
node {

  git url: "https://github.com/mazzy89/currency-converter-search.git"

  docker.withRegistry("https://264721266761.dkr.ecr.eu-west-1.amazonaws.com", "ecr:a-credential-id") {

    stage 'Build'

    def currencyConvSearch = docker.build("microservices/currency-converter-search:${env.BUILD_TAG}")

    currencyConvSearch.push()
  }
}
