import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function Carlist() {

 // Array de colunas do DataGrid (define como cada campo será exibido)
 const columns = [
   {
     field: 'id',
     headerName: 'Cód.',
     width: 90
   },
   {
      field: 'brand_model',
      headerName: 'Marca - Modelo',
      width: 200,
      // renderCell personaliza o que será exibido dentro da célula
      renderCell: (value) => {
        const brand = value.row.brand;   // pega o campo "brand" da linha
        const model = value.row.model;   // pega o campo "model" da linha
        return <>{`${brand} - ${model}`}</>; // junta em "Marca - Modelo"
      }
   },
   {
     field: 'color',
     headerName: 'Cor',
     width: 145,
   },

   {
     field: 'year_manufacture',
     headerName: 'Ano de Fabricação',
     width: 150,
     // valueFormatter para Ano de Fabricação e Data de Venda
      valueFormatter: value => {
        if(value) {
          // 1. Converte a string/timestamp da API para um objeto Date
          const date = new Date(value)
          // 2. Formata o objeto Date para o formato de data local (pt-BR = DD/MM/AAAA)
          return date.toLocaleDateString('pt-BR') 
        }
        // Se o valor for nulo ou vazio, retorna uma string vazia
        else return ''
      }
   },
   {
      field: 'imported',
      headerName: 'Importado',
      width: 100,
      // renderCell permite transformar 1/0 em "Sim" ou ""
      renderCell: (params) => {
        // params.value é 1 (true) ou 0 (false)
        const imported = params.value
        // retorna "Sim" se for importado (1) ou vazio se for nacional (0)
        return imported ? 'Sim' : ''
      },
    },
   {
     field: 'plates',
     headerName: 'Placas',
     width: 145,
   },
   {
     field: 'selling_price',
     headerName: 'Preço de Venda',
     width: 230,
      // valueFormatter para Preço de Venda
      valueFormatter: value => {
        // Formata número no padrão brasileiro de moeda (R$)
        return value.toLocaleString('pt-BR',
          {
            style: 'currency', // Indica que o formato será de moeda
            currency: 'BRL',   // Especifica a moeda (Real Brasileiro)
          });
      }
   },
   {
     field: 'selling_date',
     headerName: 'Data de Venda',
     width: 138,
     // Formata a data de venda no padrão brasileiro
     valueFormatter: value => {
       if(value) {
         const date = new Date(value)
         return date.toLocaleDateString('pt-BR')
       }
       else return ''
     }
   },
 ];


 // Estado "car" armazena o array de veículos trazido da API
 const [car, setcar] = React.useState([])


 // Função assíncrona que busca os dados na API externa
 async function loadData() {
   try {
     // Conectamos ao servidor remoto e esperamos uma resposta
     const response = await fetch('https://api.faustocintra.com.br/v2/cars')
     
     // Extraímos da resposta os dados em formato JSON
     const data = await response.json()
     
     // Armazenamos os dados na variável de estado
     setcar(data)  // isso faz a tabela atualizar automaticamente
   }
   catch(error) {
     // Exibimos o erro no console, para efeitos de depuração
     console.error(error)
     // Informamos o erro ao usuário
     alert('ERRO: ' + error.message)
   }
 }


 // useEffect executa apenas 1 vez ao carregar o componente
 // Aqui serve para chamar loadData() automaticamente ao abrir a página
 React.useEffect(() => {
   loadData()
 }, [])


 return <>
   <Typography variant="h1" gutterBottom>
     Listagem de Veículos
   </Typography>

    {/* Box define o tamanho da área onde o DataGrid será exibido */}
    <Box sx={{ height: 400, width: '100%' }}>
     <DataGrid
       rows={car}          // dados da API
       columns={columns}   // estrutura das colunas
       
       // Configura a paginação inicial
       initialState={{
         pagination: {
           paginationModel: {
             pageSize: 5,  // mostra 5 linhas por página
           },
         },
       }}
       pageSizeOptions={[5]} // limita opções a 5 por página

       checkboxSelection            // adiciona checkbox nas linhas
       disableRowSelectionOnClick   // evita selecionar ao clicar na linha
     />
   </Box>
 </>

}
