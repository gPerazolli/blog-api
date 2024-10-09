#!/bin/sh
# wait-for-mongo.sh

# Define a função para verificar se o MongoDB está acessível
until nc -z -v -w30 mongo_db 27017
do
  echo "Aguardando MongoDB iniciar..."
  sleep 5
done

echo "MongoDB está disponível. Iniciando aplicação..."

# Aqui você pode iniciar o seu processo principal, por exemplo:
exec "$@"