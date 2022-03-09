#!/bin/bash
cd /home/ubuntu/banthing/server

export CORSORIGIN=$(aws ssm get-parameters --region ap-northeast-2 --names CORSORIGIN --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export JWT_SECRETKEY=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_SECRETKEY --query Parameters[0].Value | sed 's/"//g')
export KAKAO_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_ID --query Parameters[0].Value | sed 's/"//g')
export SERVER_ENDPOINT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_ENDPOINT --query Parameters[0].Value | sed 's/"//g')
export SERVER_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_PORT --query Parameters[0].Value | sed 's/"//g')
export FRONTEND_ENDPOINT=$(aws ssm get-parameters --region ap-northeast-2 --names FRONTEND_ENDPOINT --query Parameters[0].Value | sed 's/"//g')

npm run build
authbind --deep pm2 start dist/main.js --watch
