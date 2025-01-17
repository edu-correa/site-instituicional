import useStyles from "./Register.styles"
import Container from "atoms/Container"
import { FormControlLabel, Stack, Radio, RadioGroup, TextField, Typography, Box } from "@mui/material"
import LogoPicme from "atoms/LogoPicme"
import { useNavigate, useParams } from "react-router-dom"
import CustomButton from "atoms/CustomButton"
import InputMask from "react-input-mask"
import { useState } from "react"
import goBackArrow from "assets/icons/go-back-arrow.svg"
import { ROUTES } from "utils/constants"
import { toTitleCase } from "utils/helpers/string"
import { userDataSchema } from "./Register.schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTheme } from "@mui/styles"
import { useAsyncState } from "hooks/useAsyncState"

const defaultValue = {
  nome: '',
  email: '',
  dataNasc: '',
  cpf: '',
  numCelular: '',
  senha: '',
}

const Register = () => {
  const theme = useTheme()
  const classes = useStyles()
  const navigate = useNavigate()
  const { profileType } = useParams()

  const [profile, setProfile] = useState(profileType)
  const [userData, setUserData, getState] = useAsyncState(defaultValue)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(userDataSchema)})

  const handleChange = (e) => {
    if(e.target.name === "nome"){
      e.target.value = toTitleCase(e.target.value)
    }
  }

  const handleProfileChange = (e) => {
    setProfile(e.target.value)
  }

  const CONTENTS_LEFT = [
    <TextField 
    id="email-ipt" 
    name="email" 
    label="E-mail" 
    {...register("email")}
    onChange={handleChange}
    error={!!errors.email}
    helperText={errors.email?.message}
    />,
  
    <InputMask mask="999.999.999-99" {...register("cpf")} onChange={handleChange} >
      {() => <TextField id="cpf-ipt" name="cpf" label="CPF" error={!!errors.cpf}
      helperText={errors.cpf?.message} />} 
    </InputMask>,
  
    <TextField 
    id="password-ipt" 
    name="senha" 
    type="password" 
    label="Senha" 
    {...register("senha")}
    onChange={handleChange}
    error={!!errors.senha}
    helperText={errors.senha?.message}
    />,
  ]  

  const CONTENTS_RIGHT = [
    <InputMask 
    {...register("dataNasc")}
    onChange={handleChange} 
    mask="99/99/9999"
    >
      {() => <TextField id="data-ipt" name="dataNasc"
    label="Data de nascimento" placeholder="DD/MM/AAAA" 
    error={!!errors.dataNasc} helperText={errors.dataNasc?.message}
    />}
    </InputMask>,

    <InputMask mask="(99) 99999-9999" {...register("numCelular")} onChange={handleChange}>
    {() => <TextField id="phone-ipt" name="numCelular" label="Telefone"
    error={!!errors.numCelular} helperText={errors.numCelular?.message}/>}
    </InputMask>,

    <TextField 
    id="verify-password-ipt" 
    name="confirmarSenha" 
    type="password" 
    label="Confirmar Senha" 
    {...register("confirmarSenha")}
    onChange={handleChange}
    helperText={errors.confirmarSenha?.message}
    error={!!errors.confirmarSenha}
    />

  ]

  const onSubmitHandler = async (data) => {
    const payload = {...data, dataNasc: data["dataNasc"].replace(/\//g,"-")}
    delete payload["confirmarSenha"]
    setUserData(payload)
    console.log(await getState())
  }

  return (
    <Stack direction="row" alignItems="top">
      <Stack className={classes.banner}>
        <Container py={4}>
          <img 
          src={goBackArrow} 
          alt="go-back-arrow" 
          style={{cursor: "pointer"}}
          onClick={() => navigate(ROUTES.HOME)}
          />
        </Container>
      </Stack>
      <Stack className={classes.content}>
        <Container component="form" onSubmit={handleSubmit(onSubmitHandler)} py={4}>
          <Stack width="100%" minHeight="100%" alignItems="center" spacing={3}>
            <LogoPicme />
            <Typography variant="subtitle-small-semibold">Cadastre-se</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="paragraph-medium-light">Sou um:</Typography>
              <RadioGroup 
              row 
              aria-labelledby="radio-profile-type" 
              name="profile"
              onChange={handleProfileChange}
              defaultValue={profileType} 
              >
                <FormControlLabel 
                value="cliente" 
                control={<Radio />} 
                label={<Typography variant="paragraph-medium-light">Cliente</Typography>} />

                <FormControlLabel 
                value="fotografo" 
                control={<Radio />}  
                label={<Typography variant="paragraph-medium-light">Fotógrafo</Typography>} 
                />

              </RadioGroup>
            </Stack>
            <Stack justifyContent="center" sx={{
              '& .MuiFormHelperText-root': {
                fontSize: theme.typography['paragraph-xsmall-regular'].fontSize,
              }
            }}>
              <TextField 
              id="name-ipt"
              name="nome"
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              label="Nome" 
              sx={{marginBottom: 3}} 
              width="100%" 
              onChange={handleChange}
              />
              <Stack direction="row" alignItems="top" spacing={3}>
                <Stack width="50%" alignItems="center" spacing={2}>
                  {
                    CONTENTS_LEFT.map((content, index) => (
                      <Box key={index}>
                        {content}
                      </Box>
                    ))
                  }
                </Stack>
                <Stack width="50%" alignItems="center" spacing={2}>
                  {
                    CONTENTS_RIGHT.map((content, index) => (
                      <Box key={index}>
                        {content}
                      </Box>
                    ))
                  }
                </Stack>
              </Stack>
            </Stack>
            <CustomButton variant="contained" color="secondary" type="submit" fullWidth>
              Continuar
            </CustomButton>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{fontWeight: 300}}>
                Já tem cadastro? 
              </Typography>
              <Typography 
              color="primary" 
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{fontWeight: "bold", cursor: "pointer"}}
              >
                Fazer login
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  )
}

export default Register