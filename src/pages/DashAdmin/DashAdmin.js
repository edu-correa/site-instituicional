// import { Container } from "@mui/material"
import useStyles from "./DashAdmin.styles"
import Header from 'molecules/Header'

import {
    Box,
    ImageList,
    ImageListItem,
    Stack,
    Typography
  } from "@mui/material"
import Container from "atoms/Container"
import CaixaKpi from "atoms/CaixaKpi/CaixaKpi"
import CardChartPie from "atoms/CardChartPie/CardChartPie"
import CardBarChart from "atoms/CardBarChart/CardBarChart"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react"
import CustomPopover from "molecules/CustomPopover"
import CustomPopoverDash from "atoms/CustomPopoverDash"



const DashAdmin = () => {

    const defaultValues = {
        metrica: "marketing"
    }

    const [metrica, setMetrica] = useState(defaultValues.metrica)

    const dataBar = [
        {
          name: 'Casamento',
          Contatos: 2400
        },
        {
          name: 'Aniversário',
          Contatos: 1398
        },
        {
          name: 'Debutante',
          Contatos: 9800
        },
        {
          name: 'Encontros',
          Contatos: 3908
        },
        {
          name: 'Esportivo',
          Contatos: 4800
        },
        {
          name: 'Família',
          Contatos: 3800
        }
      ];

      const dataBarFaixaEtaria = [
        {
            faixa: "18-20",
            quantidade: 300
        },
        {
            faixa: "21-25",
            quantidade: 1157
        },
        {
            faixa: "26-30",
            quantidade: 1056
        },
        {
            faixa: "31-35",
            quantidade: 278
        },
        {
            faixa: "36-40",
            quantidade: 140
        }
      ]

      const dataBarFaixaEtariaTema = [
        {
            faixa: "18-20",
            quantidade: 250
        },
        {
            faixa: "21-25",
            quantidade: 300
        },
        {
            faixa: "26-30",
            quantidade: 80
        },
        {
            faixa: "31-35",
            quantidade: 15
        },
        {
            faixa: "36-40",
            quantidade: 3
        }
      ]

  const classes = useStyles()

  return (
    <Stack sx={{ transition: '2s all ease' }}>
        <Header type={3} />
        <Container
            alignItems="center"
            flexDirection="column"
            py={4}
        >   
            <Container
                py={3}
                flexDirection="row"
                justifyContent="center"
                paddingLeft="0"
                paddingRight="0"
                width="100%"
            >
                <Container
                flexDirection="row"
                justifyContent="end"
                alignItems="center"
                paddingLeft="0"
                paddingRight="0"
                width="100%"
                >

                    <Typography
                    fontSize="16px"
                    color="black"
                    textAlign="center"
                    flex={1}
                    >
                        Você está acessando as métricas de <Box display="inline" fontWeight="bold">{metrica}</Box>
                    </Typography>

                    
                        <CustomPopoverDash>
                            <Stack p={2} className={ classes.popoupOption } onClick={() => setMetrica("marketing")}>Marketing</Stack>
                            <Stack p={2} className={ classes.popoupOption } onClick={() => setMetrica("usuários")}>Usuários</Stack>
                        </CustomPopoverDash>
                    
                    
                    {/* <FilterAltIcon onClick={ metrica === "marketing" ? () => setMetrica("usuários") : () => setMetrica("marketing") } marginLeft="auto" fontSize="40px" className={classes.iconFunil}></FilterAltIcon> */}
                
                </Container> 
                
            </Container> 
            
            <Container
                py={3}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="0"
                paddingRight="0"
            >
                <CaixaKpi
                    valorKpi="1345"
                    textoKpi="Clientes"
                    porcentagem={10}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi="230"
                    textoKpi="Sessões Realizadas"
                    porcentagem={-15}
                >
                </CaixaKpi>

                <CaixaKpi
                    valorKpi="450"
                    textoKpi="Acessos"
                    porcentagem={20}
                >
                </CaixaKpi>

            </Container>
            {metrica === "marketing" ? 
                (
                    <>
                    <Container
                    py={3}
                    flexDirection="row"
                    justifyContent="space-between"
                    paddingLeft="0"
                    paddingRight="0"
                    >
                        <CardChartPie 
                            tituloPieChart="Clientes que fecharam sessões com 1 semana utilizando o sistema"
                            label01="Fecharam"
                            label02="Não Fecharam"
                            width="40%"
                            value01={20}
                            value02={80}
                        >

                        </CardChartPie>

                        <CardBarChart
                            tituloPieChart="Temas com mais ‘contatos’ iniciados"
                            data={dataBar}
                            width="55%"
                        >
                            
                        </CardBarChart>
                    </Container>

                    <Container
                        py={3}
                        flexDirection="row"
                        justifyContent="space-between"
                        paddingLeft="0"
                        paddingRight="0"
                    >

                        <CardBarChart
                            tituloPieChart="Faixa etária dos clientes"
                            data={dataBarFaixaEtaria}
                            width="40%"
                        />

                        <CardBarChart
                            tituloPieChart="Faixa etária dos clientes por tema"
                            data={dataBarFaixaEtariaTema}
                            width="55%"
                        />

                    </Container>
                    </>
                ) : (
                    <>
                        <Container
                        py={3}
                        flexDirection="row"
                        justifyContent="space-between"
                        paddingLeft="0"
                        paddingRight="0"
                        >
                            
                            <CardChartPie
                                tituloPieChart="Base de usuários cadastrados"
                                label01="Fecharam"
                                label02="Não Fecharam"
                                width="40%"
                                value01={80}
                                value02={20}
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão de novos usuários cadastrados"
                                data={dataBarFaixaEtariaTema}
                                width="55%"
                            >

                            </CardBarChart>

                        </Container>

                        <Container
                        py={3}
                        flexDirection="row"
                        justifyContent="space-between"
                        paddingLeft="0"
                        paddingRight="0"
                        >
                            
                            <CardChartPie
                                tituloPieChart="Contatos convertidos em sessões"
                                label01="Fecharam"
                                label02="Não Fecharam"
                                width="40%"
                                value01={70}
                                value02={30}
                            >

                            </CardChartPie>

                            <CardBarChart
                                tituloPieChart="Progressão sessões de fotos realizadas"
                                data={dataBarFaixaEtariaTema}
                                width="55%"
                            >

                            </CardBarChart>

                        </Container>
                    </>
                    
                )
             }
            
            

            
        </Container>
    </Stack>
  )
}

export default DashAdmin