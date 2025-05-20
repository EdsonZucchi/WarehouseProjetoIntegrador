import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { useAlert } from "../../components/AlertProvider";
import { productUsecase } from "../usecase/ProductUseCase";
import { useEffect } from "react";

export default function ProductCard({ open, onClose, units, idProduct }) {
  const { showAlert } = useAlert();
  
  const [displayName, setDisplayName] = useState("") 

  const [product, setProduct] = useState({
    id: null,
    name: "",
    description: "",
    um: "",
    stockAlert: false,
    stockLimit: 0,
    status: "Ativo",
    createdAt: "",
  });

  const [variants, setVariants] = useState([
    { id: null, code: "", name: "", status: "Ativo" },
  ]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!open) return;

      if (idProduct != null) {
        try {
          const response = await productUsecase.getProductById(idProduct);
          setProduct({
            id: response.id,
            name: response.name,
            description: response.description,
            um: response.um.acronym,
            stockAlert: response.lowStockWarning,
            stockLimit: response.lowStockWarningQuantity,
            status: response.status,
          });
          setVariants(response.variants || []);
          setDisplayName("Atualizar")
        } catch (error) {
          showAlert("Erro ao buscar produto", "error");
        }
      } else {
        setProduct({
          id: null,
          name: "",
          description: "",
          um: "",
          stockAlert: false,
          stockLimit: 0,
          status: "Ativo",
        });
        setVariants([]);
        setDisplayName("Adicionar")
      }
    };

    fetchProduct();
  }, [open, idProduct]);

  const handleProductChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleAddProduct = async () => {
    try {
      await productUsecase.saveNewProduct(
        product.id,
        product.name,
        product.description,
        product.um,
        product.stockAlert,
        product.stockLimit,
        variants
      );
      showAlert("Adicionado com sucesso");
      return true;
    } catch (error) {
      showAlert(error.message || "Erro ao adicionar", "error");
      return false;
    }
  };

  const addVariant = () => {
    setVariants([...variants, { id: null, code: "", name: "", status: "Ativo" }]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Produto
        <Button
          onClick={handleAddProduct}
          variant="contained"
          sx={{ float: "right" }}
        >
          {displayName}
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome do Produto"
              fullWidth
              value={product.name}
              onChange={(e) => handleProductChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Unidade de Medida"
              select
              fullWidth
              value={product.um}
              onChange={(e) => handleProductChange("um", e.target.value)}
            >
              {units.map((unitMap) => (
                <MenuItem key={unitMap.acronym} value={unitMap.acronym}>
                  {unitMap.name} ({unitMap.acronym})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={product.description}
              onChange={(e) =>
                handleProductChange("description", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={product.stockAlert}
                  onChange={(e) =>
                    handleProductChange("stockAlert", e.target.checked)
                  }
                />
              }
              label="Alerta de Estoque Crítico?"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Qtd Estoque Crítico"
              fullWidth
              disabled={!product.stockAlert}
              type="number"
              value={product.stockLimit}
              onChange={(e) =>
                handleProductChange("stockLimit", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mt: 3 }}>
              Situação: <strong>{product.status}</strong>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Variantes do Produto
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "40%", p: 1 }}>Código</TableCell>
                  <TableCell sx={{ width: "40%", p: 1 }}>Nome</TableCell>
                  <TableCell sx={{ width: "20%", p: 1 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants.map((variant, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "40%", p: 1 }}>
                      <TextField
                        sx={{ width: "100%" }}
                        value={variant.code}
                        onChange={(e) =>
                          handleVariantChange(index, "code", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ width: "40%", p: 1 }}>
                      <TextField
                        sx={{ width: "100%" }}
                        value={variant.name}
                        onChange={(e) =>
                          handleVariantChange(index, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ width: "20%", p: 1 }}>
                      <Typography variant="body2" sx={{ mt: 3 }}>
                        <strong>{variant.status}</strong>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={addVariant} sx={{ mt: 1 }}>
              Nova variante
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
