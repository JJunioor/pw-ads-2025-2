import React from 'react'
// Importa o componente Typography do Material UI 
// para criar texto estilizado (títulos, subtítulos etc.)
import Typography from '@mui/material/Typography'


export default function Homepage() {
  // O componente retorna um fragmento <>
  // que contém apenas um título grande de boas-vindas
  return <>
    <Typography variant="h1">
      {/* "variant" define o tamanho do texto (h1, h2, h3 etc.) */}
      Bem-vindo(a) à loja Karangos!
    </Typography>
  </>
}
