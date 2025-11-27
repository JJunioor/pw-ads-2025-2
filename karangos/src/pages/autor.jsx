import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import minhaFoto from "../assets/foto.jpg";

export default function Autor() {

  // Estado que guarda os likes (puxa o valor salvo antes)
  const [likes, setLikes] = useState(() => {
    const salvo = localStorage.getItem("likes");
    return salvo ? Number(salvo) : 0;
  });

  // Quando o valor mudar, atualiza no localStorage
  useEffect(() => {
    localStorage.setItem("likes", likes);
  }, [likes]);

  return (
    <>
      <Card sx={{ maxWidth: 380 }}>

        {/* título da página */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sobre o autor
        </Typography>

        {/* Foto que está na pasta assets */}
        <CardMedia
          component="img"
          height="450"
          image={minhaFoto}
          alt="Minha foto"
        />

        <CardContent>

          {/* Nome */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Jalisson Junior Ribeiro de Brito
          </Typography>

          {/* Texto falando um pouco sobre mim */}
          <Typography variant="body2">
            Olá pessoal! Sou o Jalisson, tenho 21 anos e sou de Franca - SP, porém nascido em Patrocínio Paulista - SP.
            Gosto muito de tecnologia, música e completamente apaixonado por futebol. Atualmente estou cursando ADS
            na Fatec Franca e sempre tento aprender algo novo para ir evoluindo na área, porém no tempo livre gosto
             de jogar futebol com os amigos e passar tempo de qualidade com minha família.
            Meu objetivo é me tornar um profissional cada vez melhor com o tempo.
            Valeu por passar aqui!
          </Typography>
        </CardContent>

        {/* Botão que incrementa os likes */}
        <CardActions>
          <Button onClick={() => setLikes(likes + 1)}>
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
