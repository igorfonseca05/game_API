
![store api](https://github.com/user-attachments/assets/c6fcb170-5744-4cae-be59-8559514a4a83)

## Proposta da API
Esta API foi desenvolvida para gerenciar um catálogo de jogos, permitindo listar, adicionar, atualizar e excluir registros de jogos armazenados em um banco de dados MongoDB. Ela pode ser utilizada para integrar sistemas que necessitam de um gerenciamento dinâmico de jogos.

![Static Badge](https://img.shields.io/badge/Acesse_aqui-yellow?style=for-the-badge&link=https%3A%2F%2Fgame-ay28botmr-igorfonseca05s-projects.vercel.app%2F)


## Endpoints

### 1. **Obter página inicial**
```http
GET /
```
Retorna o arquivo `hero.html`.

### 2. **Listar todos os jogos**
```http
GET /games
```
Retorna uma lista com todos os jogos cadastrados.

### 3. **Obter um jogo pelo ID**
```http
GET /games/:id
```
Retorna um jogo específico com base no ID informado.

### 4. **Adicionar um novo jogo**
```http
POST /games
```
Envia um novo jogo para ser armazenado no banco de dados.

**Body (JSON):**
```json
{
  "name": "Nome do jogo",
  "description": "Descrição do jogo",
  "tags": ["Ação", "RPG"],
  "platform": "PC",
  "steam_link": "https://store.steampowered.com/app/12345",
  "price": 59.99
}
```

### 5. **Atualizar um jogo existente**
```http
PUT /games/:id
```
Atualiza as informações de um jogo com base no ID.

**Body (JSON):** (mesma estrutura do POST, com os campos a serem modificados)

### 6. **Excluir um jogo**
```http
DELETE /games/:id
```
Remove um jogo do banco de dados pelo ID informado.

## Considerações Finais
A API segue um padrão REST e retorna respostas padronizadas em JSON. Os endpoints que manipulam dados (`POST`, `PUT`, `DELETE`) exigem um corpo de requisição válido para garantir o correto funcionamento.


