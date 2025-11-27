import React from 'react'
// Importa o componente de texto do Material UI
import Typography from '@mui/material/Typography'
// Importa o Box para criar containers com estilização
import Box from '@mui/material/Box';
// Importa DataGrid, a tabela avançada do Material UI
import { DataGrid } from '@mui/x-data-grid';

export default function CustomersList() {

 // Definição do array de colunas da DataGrid
 // Cada objeto representa uma coluna da tabela
 const columns = [
   {
     field: 'id',            // nome do campo recebido da API
     headerName: 'Cód.',     // nome que aparece na coluna
     width: 90               // largura da coluna
   },
   {
     field: 'name',
     headerName: 'Nome',
     width: 250              // largura maior por ser texto grande
   },
   {
     field: 'birth_date',
     headerName: 'Data nasc.',
     width: 150,
     // valueFormatter formata o valor antes de exibir na tabela
     valueFormatter: value => {
       if(value) {
         // Converte string da API para formato Date
         const date = new Date(value)
         // Converte para DD/MM/AAAA (padrão brasileiro)
         return date.toLocaleDateString('pt-BR')
       }
       else return ''  // se vier vazio, retorna string vazia
     }
   },
   {
     field: 'municipality',
     headerName: 'Município/UF',
     width: 250,
     // valueGetter permite criar o valor exibido na célula
     // usando mais de um campo do objeto
     valueGetter: (value, row) => row.municipality + '/' + row.state
     // Exemplo: "Franca/SP"
   },
   {
     field: 'phone',
     headerName: 'Celular',
     width: 150              // largura que comporta o formato (DDD)...
   },
   {
     field: 'email',
     headerName: 'E-mail',
     width: 250
   }
 ];


 // Estado que guarda a lista de clientes
 const [customers, setCustomers] = React.useState([])


 // Função assíncrona que busca dados da API
 async function loadData() {
   try {
     // Conectamos ao servidor remoto e esperamos uma resposta
     const response = await fetch('https://api.faustocintra.com.br/v2/customers')
     
     // Extraímos da resposta os dados em formato JSON
     const data = await response.json()
     
     // Armazenamos os dados na variável de estado
     // Isso faz o DataGrid renderizar a tabela automaticamente
     setCustomers(data)
   }
   catch(error) {
     // Exibimos o erro no console, para efeitos de depuração
     console.error(error)
     // Informamos o erro ao usuário
     alert('ERRO: ' + error.message)
   }
 }


 // useEffect executa automaticamente quando o componente é montado
 // Como o array de dependências [] está vazio, roda apenas 1 vez
 React.useEffect(() => {
   loadData()  // chama função que carrega os dados da API
 }, [])


 return <>
   {/* Título grande da página */}
   <Typography variant="h1" gutterBottom>
     Listagem de clientes
   </Typography>

   {/* Container que define tamanho da tabela */}
    <Box sx={{ height: 400, width: '100%' }}>
      
     <DataGrid
       rows={customers}   // recebe lista de clientes vinda da API
       columns={columns}  // recebe estrutura de colunas definida acima

       // Configuração inicial do DataGrid
       initialState={{
         pagination: {
           paginationModel: {
             pageSize: 5,   // número de linhas por página
           },
         },
       }}

       pageSizeOptions={[5]}  // só permite 5 por página
       checkboxSelection      // adiciona checkbox nas linhas
       disableRowSelectionOnClick // impede selecionar clicando na linha
     />
   </Box>
 </>

}
