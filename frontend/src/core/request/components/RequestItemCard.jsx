import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip,
  Box,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { useAlert } from "../../components/AlertProvider";
import { useConfirm } from "../../components/ConfirmDialogContext";
import { requestUseCase } from "../usecase/RequestUseCase";
import { useEffect, useState } from "react";
import { Request } from "../model/Request";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function RequestItemCard({ open, onClose, idRequest }) {
  const { showAlert } = useAlert();
  const confirm = useConfirm();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [request, setRequest] = useState(new Request());
  const [map, setMap] = useState(new Map());

  const setQuantity = (id, quantity) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, quantity);
      return newMap;
    });
  };

  const removeMap = (id) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const fetchItems = async () => {
    try {
      var items = await requestUseCase.listItems(idRequest, filter);
      setItems(items);
    } catch (error) {
      showAlert(error.message || "Erro ao buscar itens", "error");
    }
  };

  const fetchRequest = async () => {
    try {
      var request = await requestUseCase.getRequest(idRequest);
      setRequest(request);
    } catch (error) {
      showAlert(error.message || "Erro ao buscar requisição", "error");
    }
  };

  const copyQuantity = async () => {
    setMap((prev) => {
      let newMap = new Map();

      items.forEach((value, index) => {
        newMap.set(value.variantId, value.quantitySelect);
      });

      return newMap;
    });
  };

  const clearMap = async () => {
    setMap((prev) => {
      return new Map();
    });
  };

  const finishTyping = async () => {
    try {
      if (map.size > 0) {
        await updateItems();
      }

      const confirmed = await confirm({
        title: "Finalizar requisição?",
        message: "Tem certeza que deseja finalizar essa solicitação?",
      });

      if (!confirmed) return;

      await requestUseCase.finishiTyping(idRequest);
      showAlert("Requisitado com sucesso");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao finalizar solicitação", "error");
      fetchItems();
    }
  };

  const returnRequest = async () => {
    try {
      if (map.size > 0) {
        await updateItems();
      }
      const confirmed = await confirm({
        title: "Devolver requisição?",
        message: "Tem certeza que deseja devolver essa solicitação?",
      });

      if (!confirmed) return;

      await requestUseCase.returnRequest(idRequest);
      showAlert("Devolvido com sucesso");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao finalizar solicitação", "error");
      fetchItems();
    }
  };

  const cancelTyping = async () => {
    try {
      const confirmed = await confirm({
        title: "Cancelar requisição?",
        message: "Tem certeza que deseja cancelar essa solicitação?",
      });

      if (!confirmed) return;

      await requestUseCase.cancelRequest(idRequest);
      showAlert("Cancelado com sucesso");
      onClose();
    } catch (error) {
      showAlert(error.message || "Erro ao finalizar solicitação", "error");
    }
  };

  const updateItems = async () => {
    try {
      let listDelete = [];
      for (const [key, value] of map) {
        try {
          if (request.statusCode == 0) {
            await requestUseCase.saveItemRequest(idRequest, key, value);
          } else {
            await requestUseCase.saveItemRequestReturn(idRequest, key, value);
          }
          listDelete.push(key);
        } catch (error) {
          showAlert(
            error.message || "Erro ao atualizar produto/variante",
            "error"
          );
        }
      }

      await fetchItems();

      showAlert("Atualizado com sucesso");

      setMap((prev) => {
        const newMap = new Map(prev);
        listDelete.forEach((key) => newMap.delete(key));
        return newMap;
      });
    } catch (error) {
      showAlert(error.message || "Erro ao atualizar", "error");
    }
  };

  useEffect(() => {
    if (open) {
      map.clear();
      fetchItems();
      fetchRequest();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      fetchItems();
    }
  }, [filter]);

  const parseIfNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  const getRowBackgroundColor = (item) => {
    if (map.has(item.variantId)) {
      return "#e6ffe6"; // Verde claro
    }

    if (request.statusCode !== 0) {
      return "inherit"; // Sem cor de fundo
    }

    if (item.quantitySelect > item.quantityStock) {
      return "#ffe6e6"; // Vermelho claro
    }

    if (item.quantitySelect > 0) {
      return "#fff9e6"; // Amarelo claro
    }

    return "inherit"; // Sem cor de fundo
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullScreen>
      <DialogTitle>
        Requisição #{idRequest}
        <Chip color="info" label={request.status} sx={{ marginLeft: "5px" }} />
        <Chip
          color="success"
          label={request.requestName}
          sx={{ marginLeft: "5px" }}
        />
        <Chip
          color="success"
          label={request.warehouseName}
          sx={{ marginLeft: "5px" }}
        />
        <Box sx={{ float: "right", display: "flex", gap: "5px" }}>
          {request.statusCode == 3 ? (
            <></>
          ) : (
            <>
              <Button
                onClick={updateItems}
                variant="contained"
                color="primary"
                disabled={!map.size > 0}
              >
                Atualizar
              </Button>
              {request.statusCode == 0 ? (
                <>
                  <Button
                    onClick={cancelTyping}
                    variant="contained"
                    color="error"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={finishTyping}
                    variant="contained"
                    color="success"
                  >
                    Requisitar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={returnRequest}
                    variant="contained"
                    color="success"
                  >
                    Devolver
                  </Button>
                  <Button
                    onClick={copyQuantity}
                    variant="contained"
                    color="warning"
                  >
                    Copiar quantidades
                  </Button>
                  <Button
                    onClick={clearMap}
                    variant="contained"
                    color="warning"
                  >
                    Limpar campos
                  </Button>
                </>
              )}
            </>
          )}
          <Button onClick={onClose} variant="outlined" color="error">
            Fechar
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Filtro"
          fullWidth
          onChange={(e) => setFilter(e.target.value)}
          sx={{ marginBottom: "12px" }}
        />

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          {request.statusCode == 3 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Variante</TableCell>
                    <TableCell>Quantidade requisitada</TableCell>
                    <TableCell>Quantidade devolvida</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.variantId}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>
                        {item.variantCode} - {item.variantName}
                      </TableCell>
                      <TableCell>{item.quantitySelect}</TableCell>
                      <TableCell>{item.quantityReturn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              {request.statusCode == 0 ? (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell>Variante</TableCell>
                        <TableCell>Estoque</TableCell>
                        <TableCell>Quantidade selecionada</TableCell>
                        <TableCell align="center">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow
                          key={item.variantId}
                          sx={{
                            backgroundColor: getRowBackgroundColor(item),
                          }}
                        >
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>
                            {item.variantCode} - {item.variantName}
                          </TableCell>
                          <TableCell>{item.quantityStock}</TableCell>
                          <TableCell>
                            <TextField
                              variant="standard"
                              sx={{ width: "25ch" }}
                              size="small"
                              slotProps={{
                                input: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {item.um}
                                    </InputAdornment>
                                  ),
                                },
                              }}
                              value={
                                map.get(item.variantId) ?? item.quantitySelect
                              }
                              onChange={(e) =>
                                setQuantity(
                                  item.variantId,
                                  parseIfNumber(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="delete"
                              color="error"
                              disabled={!map.has(item.variantId)}
                              onClick={() => removeMap(item.variantId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell>Variante</TableCell>
                        <TableCell>Quantidade requisitada</TableCell>
                        <TableCell>Quantidade devolvida</TableCell>
                        <TableCell align="center">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow
                          key={item.variantId}
                          sx={{
                            backgroundColor: getRowBackgroundColor(item),
                          }}
                        >
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>
                            {item.variantCode} - {item.variantName}
                          </TableCell>
                          <TableCell>{item.quantitySelect}</TableCell>
                          <TableCell>
                            <TextField
                              variant="standard"
                              sx={{ width: "25ch" }}
                              size="small"
                              slotProps={{
                                input: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {item.um}
                                    </InputAdornment>
                                  ),
                                },
                              }}
                              value={
                                map.get(item.variantId) ?? item.quantityReturn
                              }
                              onChange={(e) =>
                                setQuantity(
                                  item.variantId,
                                  parseIfNumber(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="copy"
                              title="Copiar quantidade"
                              color="default"
                              onClick={() =>
                                setQuantity(item.variantId, item.quantitySelect)
                              }
                            >
                              <ContentCopyIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              title="Deletar quantidade"
                              disabled={!map.has(item.variantId)}
                              onClick={() => removeMap(item.variantId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </>
          )}
        </TableContainer>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
