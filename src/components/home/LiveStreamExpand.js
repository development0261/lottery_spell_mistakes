import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import CityTable from "./CityTable"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import NativeSelect from "@material-ui/core/NativeSelect"
import InputBase from "@material-ui/core/InputBase"

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
  const colHead = ["Primera", "Matutina", "Vespertina", "Nocturna"]
  const rowHead = props.rowHead

  var cityData = []
  let options = props.options
  const type = props.type

  // 0: Selected Column
  // 1: Selected Row 10
  // 10: Selected specific cell
  if (type === 0) {
    const data = props.data && props.data
    data &&
      data.map((d, index) => {
        if (!!d?.[0]) {
          for (const val of d) {
            if (val?.name?.toLowerCase().search(props.colHeader) >= 0)
              cityData.push({ ...val })
          }
        } else {
          cityData.push({
            label: "empty",
            name: `${rowHead[index]} - ${
              props.colHeader === "primera" ? "La Primera" : props.colHeader
            }`,
          })
        }
      })
  } else if (type === 1) {
    let title = props.rowHead.filter(
      data =>
        data
          .replace(" ", "")
          .replace("é", "e")
          .replace("á", "a")
          .replace("í", "i")
          .toLowerCase() === props.rowHeader
    )
    let finalNameArray = colHead.map(val => {
      return `${title} - ${val === "Primera" ? "La Primera" : val}`
    })
    const data = props.data
    cityData = data[0]?.expand

    for (let val in cityData) {
      if (!cityData[val].name) {
        cityData[val] = {
          label: "empty",
          name: finalNameArray[val],
        }
      }
    }
  } else {
    const data = props?.data
    if (data === undefined || !data?.[0]) {
      let title = props.rowHead.filter(
        data =>
          data
            .replace(" ", "")
            .replace("é", "e")
            .replace("á", "a")
            .replace("í", "i")
            .toLowerCase() === props.rowHeader
      )
      cityData = [
        {
          label: "empty",
          name: `${title} - ${
            props.colHeader === "primera" ? "La Primera" : props.colHeader
          }`,
        },
      ]
    } else {
      cityData = data
    }
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
              {options.map((val, index) => (
                <option
                  key={index}
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
        {cityData.map((row, index) => {
          return (
            <div key={index}>
              <CityTable data={row} type={type} />
            </div>
          )
        })}
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
