import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import CityTable from "./CityTable"
import Icons from "./Icons"
import Grid from "@material-ui/core/Grid"

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"

import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import NativeSelect from "@material-ui/core/NativeSelect"
import InputBase from "@material-ui/core/InputBase"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import TableHeader from "./tableHeader"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1rem 0.2rem 0 0.2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "13px",
    },
    marginBottom: 20,
  },
  Container: {
    backgroundColor: "#e3003b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.2rem",
    },
  },
  h3: {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  ImgContainer: {
    margin: "0.1rem 0.5rem",
    width: 39,
    height: 26,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 21,
    },
  },
  Image: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fcc43e",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: 80,
    },
  },
  quinielaImg: {
    width: "24%",
    [theme.breakpoints.down("xs")]: {
      width: "36%",
      height: 60,
    },
  },
  Row: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "inline-block",
    },
  },
  margin: {
    width: "70%",
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  Txt: {
    fontSize: 20,
    fontWeight: 500,
    width: "30%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}))

function LiveStream(props) {
  const classes = useStyles()
  const colHead = ["Primera", "Matutino", "Vespertino", "Nocturna"]
  const rowHead = [
    "Ciudad",
    "Provincia",
    "Cordoba",
    "Santa Fe",
    "Entre Rios",
    "Mendoza",
    "Santiago",
    "Corrientes",
    "Chaco",
    "Neuquen",
    "San Luis",
    "Salta",
    "Juujuy",
    "Chubut",
    "Formosa",
    "Misiones",
    "Catamarca",
    "La Rioja",
    "Rio Negro",
    "Montevideo",
    "Tucuman",
    "San Juan",
  ]
  const data = useStaticQuery(graphql`
    query {
      liveIcon: file(relativePath: { eq: "live_icon.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      quiniela: file(relativePath: { eq: "quinielas.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  var cityData = []
  let options = props.options
  const type = props.type

  // 0: Selected Column
  // 1: Selected Row 10
  // Selected specific cell
  if (type === 0) {
    const data = props.data && props.data
    data &&
      data.forEach((d, index) => {
        let condition
        // for (let a in d) {
        //   console.log("tatti", a)
        // }
        console.log("d", d, index)
        if (d != undefined) {
          if (d.length > 0) {
            for (const val of d) {
              if (val?.name?.toLowerCase().search(props.colHeader) >= 0)
                cityData.push({ ...val })
            }
          } else {
            console.log("aya?", index)
            console.log("testingggg?", props.colHeader)

            cityData.push({
              label: "empty",
              name: `${rowHead[index]} - ${
                props.colHeader === "primera" ? "La Primera" : props.colHeader
              }`,
            })
          }
        }
      })
    console.log("data", cityData.length)
    if (cityData.length < 3) {
      cityData.length = 0
      for (let i = cityData.length; i < 22; i++) {
        cityData.push({
          label: "empty",
          name: `${rowHead[i]} - ${
            props.colHeader === "primera" ? "La Primera" : props.colHeader
          }`,
        })
      }
    }
    console.log("ary", cityData)
  } else if (type === 1) {
    const data = props.data
    cityData = data[0]?.expand
  } else {
    const data = props?.data
    cityData = props?.data
  }

  const [state, setState] = React.useState(props.defaultOption)
  React.useEffect(() => {
    !state && setState(props.defaultOption)
  }, [])

  const handleChange = name => event => {
    setState(event.target.value)
    let oldPath = window.location.pathname.split("/")
    oldPath[2] = event.target.value
      .replace(" ", "")
      .replace("é", "e")
      .replace("á", "a")
      .replace("í", "i")
      .toLowerCase()
    let newPath = oldPath.join("/")

    window.location.pathname = newPath
  }

  const { pathname } = window.location

  // let pathArray = pathname?.split("/")[2]

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className={classes.Row}>
          <span className={classes.Txt}>Loterial: </span>
          <FormControl className={classes.margin}>
            <NativeSelect
              value={props.defaultOption}
              id="demo-customized-select-native"
              onChange={handleChange("label")}
              input={<BootstrapInput />}
            >
              {options.map(val => (
                <option
                  value={val
                    .replace(" ", "")
                    .replace("é", "e")
                    .replace("á", "a")
                    .replace("í", "i")
                    .toLowerCase()
                    .toLowerCase()}
                >
                  {val}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <div className={classes.Row}>
          <span className={classes.Txt}>Fetcha: </span>
          <FormControl className={classes.margin}>
            <BootstrapInput value="30/01/2020" />
          </FormControl>
        </div>
        {console.log("table dataaa", cityData)}
        {cityData == null ? (
          <div style={{ textAlign: "center" }}>Loading</div>
        ) : (
          cityData.map((row, index) => {
            return (
              <div>
                <CityTable data={row} type={type} />
              </div>
            )
          })
        )}
      </Grid>
    </div>
  )
}

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 20,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: ["Montserrat"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    fontWeight: 600,
  },
}))(InputBase)

export default LiveStream
