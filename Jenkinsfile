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
    DEPLOY_FOLDER = "${env.GIT_BRANCH == 'origin/main' ? 'production' : 'staging'}"
  }

  stages {
    stage('Notifier Discord') {
      steps {
        script {
          def author  = sh(script: "git log -1 --pretty=format:%an", returnStdout: true).trim()
          def message = sh(script: "git log -1 --pretty=format:%s", returnStdout: true).trim()
          def branch = env.GIT_BRANCH ?: sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

          sh """
            curl -H "Content-Type:application/json" -X POST -d '{
              "content": "📢 Nouveau **push** détecté sur la branche `${branch}` ! 🚀\\n👤 **Auteur** : ${author}\\n📝 **Commit** : ${message}"
            }' "${DISCORD_WEBHOOK_GIT}"
          """
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('frontend') {
          sh 'npm ci'
        }
      }
    }

    stage('Test E2E (Cypress)') {
      steps {
        dir('frontend') {
          script {
            def exitCode = sh(script: 'npm run test:e2e', returnStatus: true)
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
          junit testResults: 'frontend/cypress/results/*.xml', allowEmptyResults: true, skipMarkingBuildUnstable: true
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Docker Build and Tag') {
      steps {
        script {
          sh 'docker compose -f docker-compose.yml build'
        }
      }
    }

    stage('Docker Save and Copy Artifacts') {
      steps {
        script {
          def timestamp = sh(script: "date +%Y%m%d-%H%M%S", returnStdout: true).trim()
          def imageTag = "${DEPLOY_FOLDER}-${timestamp}"

          sh """
            docker save my-frontend-image > ${imageTag}-frontend.tar
            docker save my-backend-image > ${imageTag}-backend.tar
            mkdir -p /var/jenkins_home/deploy/${DEPLOY_FOLDER}
            mv ${imageTag}-*.tar /var/jenkins_home/deploy/${DEPLOY_FOLDER}/
          """
        }
      }
    }

    stage('Analyse SonarQube - DÉSACTIVÉ') {
      steps {
        echo "Analyse SonarQube temporairement désactivée - scanner non disponible"
        sh """
          curl -H "Content-Type:application/json" -X POST -d '{
            "content": "⚠️ **Analyse SonarQube ignorée** - Scanner non disponible"
          }' "${DISCORD_WEBHOOK_SONAR}"
        """
      }
    }

    stage('Notification Analyse') {
      when {
        expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
      }
      steps {
        sh """
          curl -H "Content-Type:application/json" -X POST -d '{
            "content": "📊 Analyse **SonarQube** (désactivée) - build Docker terminé avec succès dans `${DEPLOY_FOLDER}`."
          }' "${DISCORD_WEBHOOK_SONAR}"
        """
      }
    }
  }

  post {
    failure {
      sh """
        curl -H "Content-Type:application/json" -X POST -d '{
          "content": "🚨 **Build échoué** ! Consultez Jenkins pour plus de détails."
        }' "${DISCORD_WEBHOOK_GIT}"
      """
    }
  }
}
