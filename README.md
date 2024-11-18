

## 1. Instale as Dependências

```bash
npm install


## 2. Estrutura do Projeto

src/
│
├── controllers/           # Controladores responsáveis pelas lógicas de negócio
│   ├── company.controller.ts
│   ├── driver.controller.ts
│   └── vehicle.controller.ts
│
├── dto/                   # Objetos de transferência de dados (DTOs)
│   ├── create-company.dto.ts
│   ├── create-driver.dto.ts
│   └── create-vehicle.dto.ts
│
├── entity/                # Definição das entidades (modelos do banco de dados)
│   ├── company.entity.ts
│   ├── driver.entity.ts
│   └── vehicle.entity.ts
│
├── routes/                # Definição das rotas do Express
│   ├── company.routes.ts
│   ├── driver.routes.ts
│   └── vehicle.routes.ts
│
├── services/              # Serviços responsáveis pela lógica de manipulação de dados
│   ├── company.service.ts
│   ├── driver.service.ts
│   └── vehicle.service.ts
│
├── utils/                 # Funções auxiliares/utilitárias
│   └── validation.utils.ts
│
├── config/              # Configuração de conexão com o banco de dados
│   └── db.ts
│
└── app.ts                 # Inicialização do servidor Express


## 3. Variáveis de Ambiente

# DB_HOST="new-database.cluster-cv2sgxogwffx.sa-east-1.rds.amazonaws.com"
# DB_PORT="3306"
# DB_USER="candidate3"         -> Está no arquivo do Teste
# DB_PASS="ubnpS3rySnj88Sum"
# DB_NAME="shippify3"  

#DB_HOST="db.internal.shippify.co"
#DB_PORT="3306"
#DB_USER="candidate3"         -> via whatsapp
#DB_PASS="ubnpS3rySnj88Sum" 
#DB_NAME="shippify3"


DB_HOST="127.0.0.1"
DB_PORT="3306" 
DB_USER="root"             -> Localmente
DB_PASS="ubnpS3rySnj88Sum"
DB_NAME="shippify3"

## 4. Compilação e Execução

# Desenvolvimento
npm run dev

# Test

npm run test

## 5. Uso da API

# Criar uma Company
URL :http://localhost:3003/api/companies
Método: POST
Descrição: Cria uma nova empresa no sistema.
Corpo da Requisição:

{
  "name": "Tech Innovations",
  "city": 2,
  "status": "Active",
  "plan_type": "Premium"
}


# Criar um Drivers
URL :http://localhost:3003/api/drivers
Método: POST
Descrição: Registra um novo motorista, associando-o a uma empresa existente.
Corpo da Requisição:

{
  "company_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "avatar_url": "https://example.com/avatar.jpg",
  "status": "Active"
}

# Criar um Vehicles
URL :http://localhost:3003/api/vehicles
Método: POST
Descrição: Adiciona um veículo ao sistema, associando-o a um motorista específico.
Corpo da Requisição:

{
  "driver_id": 1,
  "plate": "234M3",
  "model": "Fusca",
  "type": "Sedan",
  "capacity": "4"
}

# Listar Veículos de um Motorista
URL :http://localhost:3003/api/vehicles/driver/1
Método: GET
Descrição: Retorna todos os veículos associados a um motorista específico.
Corpo da Resposta:

{
  "driver_id": 1,
  "plate": "234M3",
  "model": "Fusca",
  "type": "Sedan",
  "capacity": "4"
}

## 6. Testes

# Testes unitários
npm test












```
