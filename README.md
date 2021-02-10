# job-matching

## Como usar o sistema

O sistema é bem simples, você deve informe os requisitos da vaga, e buscar os 5 melhores candidatos.
O sistema está disponível para uso em: https://jobmatching.zenatureza.com/

## Rodando os testes

Em ./backend basta rodar:

```shell
yarn test
```

## Usar a aplicação em modo de desenvolvimento

Para utilizar o backend da aplicação em desenvolvimento recomendo usar o docker-compose:

```shell
docker-compose up --build -d
```

E o frontend basta rodar:

```shell
cd frontend && yarn start
```

## Coisas a melhorar

- [ ] Adicionar categorias nas tecnologias para inferir melhor os candidatos conforme ramo de atuação, por exemplo vaga pede React, candidato não possui, mas possui Vue.js (frontend)
- [ ] Implementar autenticação, com perfil do recrutador
- [ ] Implementar sistema de avaliação, para que o recrutador indique se os candidatos obtidos são realmente úteis
- [ ] Implementar processo de CI/CD
- [ ] Implementar testes de integração
