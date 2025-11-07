pipeline {
    agent any

    // --- Pipeline Options ---
    options {
        timestamps() // Adds timestamps in Jenkins logs
        buildDiscarder(logRotator(numToKeepStr: '20')) // Keeps only last 20 builds
    }

    environment {
        PROJECT = "ncr-jenkins-demo"
    }

    stages {

        // --- Stage 1: Checkout Code ---
        stage('Checkout Code') {
            steps {
                echo "🧩 Checking out source code..."
                // If you later push this repo to GitHub, replace with this line:
                // git branch: 'main', url: 'https://github.com/suyashpandey1203/ncr-jenkins-demo.git'
                bat 'dir' // For Windows — lists files in current workspace
            }
        }

        // --- Stage 2: Install Dependencies ---
        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                bat 'npm install'
            }
        }

        // --- Stage 3: Run Unit Tests ---
        stage('Run Unit Tests') {
            steps {
                echo "🧪 Running Jest test cases..."
                bat 'npm test'
            }
        }

        // --- Stage 4: Run Sample Computation ---
        stage('Run Sample Computation') {
            steps {
                echo "⚙️ Computing nCr(1000, 500) using factorial and invfact..."
                bat 'node bin\\compute.js 1000 500'
            }
        }

        // --- Stage 5: Archive Results ---
        stage('Archive Results') {
            steps {
                echo "📁 Archiving artifacts (if any)..."
                // Create a dummy artifact for demonstration
                bat 'echo Build Success > result.txt'
                archiveArtifacts artifacts: 'result.txt', fingerprint: true
            }
        }
    }

    // --- Post Build Actions ---
    post {
        success {
            echo "✅ Pipeline for ${env.PROJECT} completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed — check console output for details."
        }
    }
}
