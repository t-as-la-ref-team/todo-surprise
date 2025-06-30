pipeline {
  agent any

  tools {
    nodejs 'NodeJS'
  }

  triggers {
    githubPush()
  }

  environment {
    DISCORD_WEBHOOK_GIT    = credentials('discord-webhook-git')
    DISCORD_WEBHOOK_TEST   = credentials('discord-webhook-test')
    DISCORD_WEBHOOK_SONAR  = credentials('discord-webhook-sonar')
  }

  stages {

    stage('Notifier Discord') {
      steps {
        script {
          def author  = sh(script: "git log -1 --pretty=format:%an", returnStdout: true).trim()
          def message = sh(script: "git log -1 --pretty=format:%s", returnStdout: true).trim()
          def branch  = env.GIT_BRANCH ?: sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

          sh """
            curl -H "Content-Type:application/json" -X POST -d '{
              "content": "📢 Nouveau **push** détecté sur la branche `${branch}` ! 🚀\\n👤 **Auteur** : ${author}\\n📝 **Commit** : ${message}"
            }' "${DISCORD_WEBHOOK_GIT}"
          """
        }
      }
    }

    stage('Test E2E (Cypress)') {
      steps {
        dir('front') {
          sh 'npm ci'
          script {
            def exitCode = sh(script: 'npm run e2e', returnStatus: true)
            if (exitCode != 0) {
              echo '❌ Tests Cypress échoués.'
              sh """
                curl -H "Content-Type:application/json" -X POST -d '{
                  "content": "❌ **Tests Cypress échoués !**\\nVoir les résultats dans Jenkins pour plus d’informations."
                }' "${DISCORD_WEBHOOK_TEST}"
              """
              error('Fin du build suite à des erreurs Cypress')
            } else {
              echo '✅ Tests Cypress passés avec succès.'
              sh """
                curl -H "Content-Type:application/json" -X POST -d '{
                  "content": "✅ Tests Cypress passés avec succès !"
                }' "${DISCORD_WEBHOOK_TEST}"
              """
            }
          }
        }
      }
      post {
        always {
          junit testResults: 'front/cypress/results/*.xml', allowEmptyResults: true, skipMarkingBuildUnstable: true
        }
      }
    }

    stage('Analyse SonarQube') {
      steps {
        withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
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
      }
      post {
        success {
          sh """
            curl -H "Content-Type:application/json" -X POST -d '{
              "content": "✅ Analyse **SonarQube** terminée avec succès !"
            }' "${DISCORD_WEBHOOK_SONAR}"
          """
        }
        failure {
          sh """
            curl -H "Content-Type:application/json" -X POST -d '{
              "content": "❌ **Analyse SonarQube échouée !**"
            }' "${DISCORD_WEBHOOK_SONAR}"
          """
        }
      }
    }
  }
}
