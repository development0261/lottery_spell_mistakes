import React from "react"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import withWidth, { isWidthUp } from "@material-ui/core/withWidth"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import useSWR from "swr"
// import rowsData from '../../data/quiniela.json'
import useWS from "./useWs"
import { Link } from "gatsby"
import TableCellLoader from "./tableHeader/tableLoader"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: props => (props.active ? "0" : "16px 0"),
    [theme.breakpoints.down("xs")]: {
      padding: props => (props.active ? "0" : "16px 0"),
    },
  },
  head: {
    backgroundColor: "#fdde95",
    fontSize: "1.2rem",
    fontWeight: "bold",
    borderLeft: "4px solid #fef2d5",
    textAlign: "center",
    fontFamily: "Montserrat",
    "&:first-child": {
      borderLeft: "unset !important",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
      minWidth: 40,
      borderLeft: "2px solid #fef2d5",
      "&:first-child": {
        width: "100px",
      },
    },
  },
  body: {
    fontFamily: "Open Sans",
    fontSize: "1rem",
    fontWeight: "400",
    backgroundColor: "#fff",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      fontWeight: "500",
      "&:first-child": {
        fontWeight: "700",
      },
    },
  },
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)

const useStyles = makeStyles(theme => ({
  headerArrow: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      margin: "0px 2px",
    },
  },
  headerImage: {
    // display: "none",

    [theme.breakpoints.up("lg")]: {
      display: "none",
    },

    [theme.breakpoints.down("xs")]: {
      display: "none",
      // width: 16,
      // marginTop: 6,
      // height: 12,
      // marginLeft: 3,
    },
  },
  active: {
    color: "red",
    fontSize: "2.4rem",
    fontWeight: 700,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  table: {
    overflow: "hidden",
    tableLayout: "fixed",
  },
  tableContainer: {
    overflow: "hidden",
  },
  link: {
    textDecoration: "none",
    color: "#150998",
    textAlign: "center",
  },
}))

const fetcher = url => fetch(url).then(res => res.json())

function StreamTable({ width }) {
  const classes = useStyles()

  const sortOrder = [
    "Ciudad",
    "Provincia",
    "Cordoba",
    "Santa Fe",
    "Montevideo",
    "Entre Rios",
    "Mendoza",
    "Santiago",
    "Corrientes",
    "Chaco",
    "Neuquén",
    "San Luis",
    "Salta",
    "Jujuy",
    "Tucumán",
    "Chubut",
    "Formosa",
    "Misiones",
    "Catamarca",
    "San Juan",
    "La Rioja",
    "Río Negro",
  ]

  let { data } = useWS()
  let result = []

  sortOrder.forEach(function(key) {
    var found = false
    data = data.filter(function(item) {
      if (!found && item.name == key) {
        result.push(item)
        found = true
        return false
      } else return true
    })
  })

  const tableHeader = isWidthUp("sm", width)
    ? ["Primera", "Matutina", "Vespertina", "Nocturna"]
    : ["Pri.", "Mat.", "Ves.", "Noc."]
  const dataQuery = useStaticQuery(graphql`
    query {
      iconarrow: file(relativePath: { eq: "iconarrow.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  const mappingKeys = ["Primera", "Matutina", "Vespertina", "Nocturno"]
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.Head}>
              <StyledTableCell>Quiniela</StyledTableCell>
              {tableHeader.map(val => {
                return (
                  <StyledTableCell
                    align="center"
                    color="#150898"
                    display="flex"
                    style={{
                      color: "#150898",
                    }}
                  >
                    <span className={classes.headerArrow}>
                      <Link
                        to={
                          "/quiniela/" +
                          val
                            .toLowerCase()
                            .replace("pri.", "primera")
                            .replace("mat.", "matutina")
                            .replace("ves.", "vespertina")
                            .replace("noc.", "nocturno")
                        }
                        className={classes.link}
                      >
                        <span>{val}</span>
                      </Link>
                      <Img
                        fluid={dataQuery.iconarrow.childImageSharp.fluid}
                        fadeIn={false}
                        alt="Arrow"
                        className={classes.headerImage}
                      />
                    </span>
                  </StyledTableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result &&
              result.map((row, index) => (
                <StyledTableRow className={classes.Row}>
                  <StyledTableCell
                    scope="row"
                    style={{
                      border: "2px solid #feebbf",
                      backgroundColor: "none",
                    }}
                  >
                    <Link
                      to={
                        "/quiniela/" +
                        row.name
                          .toLowerCase()
                          .replace(" ", "")
                          .replace("é", "e")
                          .replace("á", "a")
                          .replace("í", "i")
                      }
                      className={classes.link}
                      style={{ color: "black" }}
                    >
                      {row.name}
                    </Link>
                  </StyledTableCell>
                  {mappingKeys.map(key => (
                    <StyledTableCell
                      style={{
                        border: "2px solid #feebbf",
                      }}
                      align="center"
                    >
                      {row.values[key] ? (
                        row.values[key].value ? (
                          <Link
                            to={
                              "/quiniela/" +
                              row.name
                                .toLowerCase()
                                .replace(" ", "")
                                .replace("é", "e")
                                .replace("á", "a")
                                .replace("í", "i") +
                              "/" +
                              key.toLowerCase().replace("/ |", "")
                            }
                            className={classes.link}
                            style={{ color: "black" }}
                          >
                            {row.values[key].value.toLowerCase()}
                          </Link>
                        ) : (
                          <TableCellLoader />
                        )
                      ) : null}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default withWidth()(StreamTable)
