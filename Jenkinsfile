pipeline {
  agent any

  environment {
    DISCORD_WEBHOOK_GIT    = credentials('discord-webhook-git')
    DISCORD_WEBHOOK_TEST   = credentials('discord-webhook-test')
    DISCORD_WEBHOOK_SONAR  = credentials('discord-webhook-sonar')
    SONAR_TOKEN            = credentials('sonarqube-token')
  }

  stages {

    stage('Notifier Discord') {
      agent {
        docker {
          image 't-as-la-ref-agent:latest'
          args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        script {
          def author = sh(script: "git log -1 --pretty=format:%an", returnStdout: true).trim()
          def message = sh(script: "git log -1 --pretty=format:%s", returnStdout: true).trim()
          def branch = env.GIT_BRANCH ?: sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
          sh """curl -H "Content-Type:application/json" -X POST -d '{"content": "📢 Push sur `${branch}`\\n👤 Auteur : ${author}\\n📝 Commit : ${message}"}' "${DISCORD_WEBHOOK_GIT}" """
        }
      }
    }

    stage('Test E2E (Cypress)') {
      agent {
        docker {
          image 't-as-la-ref-agent:latest'
          args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        dir('front') {
          sh 'npm ci'
          script {
            def exitCode = sh(script: 'npm run e2e', returnStatus: true)
            if (exitCode != 0) {
              sh """curl -H "Content-Type:application/json" -X POST -d '{"content": "❌ Tests Cypress échoués."}' "${DISCORD_WEBHOOK_TEST}" """
              error('Cypress failed')
            } else {
              sh """curl -H "Content-Type:application/json" -X POST -d '{"content": "✅ Tests Cypress OK."}' "${DISCORD_WEBHOOK_TEST}" """
            }
          }
        }
      }
      post {
        always {
          junit testResults: 'front/cypress/results/*.xml', allowEmptyResults: true
        }
      }
    }

    stage('Analyse SonarQube') {
      agent {
        docker {
          image 't-as-la-ref-agent:latest'
          args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        dir('front') {
          sh '''
            sonar-scanner \
              -Dsonar.projectKey=t-as-la-ref \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://212.83.130.69:9000 \
              -Dsonar.token=$SONAR_TOKEN
          '''
        }
      }
      post {
        success {
          sh """curl -H "Content-Type:application/json" -X POST -d '{"content": "✅ Analyse SonarQube OK."}' "${DISCORD_WEBHOOK_SONAR}" """
        }
        failure {
          sh """curl -H "Content-Type:application/json" -X POST -d '{"content": "❌ Analyse SonarQube échouée."}' "${DISCORD_WEBHOOK_SONAR}" """
        }
      }
    }

  }
}
