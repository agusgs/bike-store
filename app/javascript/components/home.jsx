import React, {useEffect, useState} from 'react'
import {
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import If from "./if";
import ErrorHandler from "./errorHandler";
import * as PropTypes from "prop-types";
import {getCustomizableAreas, getProducts} from "./api";
import CustomizableArea from "./customizable_area";

const spinner = <Grid container maxWidth="xs" alignItems="center">
    <Grid item xs={12}>
        <CircularProgress/>
    </Grid>
</Grid>

const CustomizableAreas  = (props) => {
    const [customizableAreas, setCustomizableAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        if(props.product.id) {
            getCustomizableAreas(props.product).then(customizableAreas => {
                setCustomizableAreas(customizableAreas)
                setLoading(false)
            }).catch(() => {
                setError(true)
                setLoading(false)
            })
        }
    }, [props.product])

    if (props.product.id) {
        const content = <Grid container maxWidth="md" direction="column" alignItems="center">
            <Grid item xs={12}>
                {
                    customizableAreas.map((customizableArea) => {
                        return <CustomizableArea key={customizableArea.id} customizableArea={customizableArea} />
                    })
                }
            </Grid>
        </Grid>;

        return(
            <ErrorHandler error={error}>
                <Container component="main" maxWidth="xl">
                    <If condition={loading} then={spinner} else={content}/>
                </Container>
            </ErrorHandler>
        )
    } else {
        return null
    }
}

CustomizableAreas.propTypes = {product: PropTypes.shape({})};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const handleProductChange = (event) => {
        setProduct(products.find(product => (product.id === event.target.value)))
    }

    useEffect(() => {
        getProducts().then(response => {
                setProducts(response)
                setLoading(false);
            })
            .catch(() => {
                console.log('An error occurred while fetching the products')
                setError(true)
                setLoading(false)
            })
    }, [])

    const classes = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(2),
            minWidth: 200,
        },
    }))();

    const content = <Grid container maxWidth="md" direction="column" alignItems="center">
        <Grid item xs={12}>
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Please select the product you want
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="product_selection_label">Product</InputLabel>
                <Select
                    labelId="product_selection_label"
                    id="product_selection"
                    value={product.id || ''}
                    onChange={handleProductChange}
                >
                    {
                        products.map(product => (<MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>))
                    }
                </Select>
            </FormControl>
            <CustomizableAreas product={product}/>
        </Grid>
    </Grid>;


    return (
        <ErrorHandler error={error}>
            <Container component="main" maxWidth="xl">
                <If condition={loading} then={spinner} else={content}/>
            </Container>
        </ErrorHandler>
    )
}

export default Home