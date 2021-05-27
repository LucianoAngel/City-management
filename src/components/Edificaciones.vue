<template>
<!-- Body -->
  <div class="app-background">
    <b-container class="mt-3">
    <div>
    <!-- Cabecera -->
      <div class="alert alert-primary" role="alert">
        <h2 class="d-flex text-center align-items-center text-white">
          <b-icon icon="shop"></b-icon>-Edificaciones
        </h2>
      </div>
    <!-- Formulario de edificaciones -->
      <b-row>
        <!-- Reesponsive del formulario -->
        <b-col xl="4" lg="5" md="12" sm="12">
           <b-card>
            <label for="nombre">Nombre:</label>
            <input id="nombre" type="text" class="form-control mb-2" v-model.trim="edificio.nombre" placeholder="Ingresa el nombre de la edificación">
            <label for="categoria">Categoría:</label>
            <b-form-select @change="delete edificio.divisiones" class="mb-2" id="categoria" v-model="categoria" :options="categorias"></b-form-select>
            <span v-if="categoria === 'edificacion'">
              <label for="divisiones">Divisiones:</label>
              <input id="divisiones" type="number" class="form-control mb-2" v-model.number="edificio.divisiones" placeholder="Ej: 5 habitaciones / 9 locales / 15 departamentos">
            </span>
            <label for="arquitectura">Arquitectura:</label>
            <input id="arquitectura" type="text" class="form-control mb-2" v-model.trim="edificio.arquitectura" placeholder="Clásica / Rustica / Moderna">
            <label for="dimensiones">Dimensión del terreno:</label>
            <input id="dimensiones" type="number" class="form-control mb-2" v-model.number="edificio.dimensionTerreno" placeholder="50m^2">
            <label for="tipo">Tipo de edificación:</label>
            <input id="tipo" type="text" class="form-control mb-2" v-model.trim="edificio.categoria" placeholder="Residencia / Apartamento / Complejo comercial">
            <label for="direccion">Dirección:</label>
            <b-form-textarea
              class="mb-2"
              id="direccion"
              v-model="edificio.direccion"
              placeholder="Ingresa la dirección de la edificación"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <button class="btn btn-primary" @click="edificacionCrear">Agregar</button>
          </b-card>
        </b-col>
        <b-col>
          <!-- Lista de las edificaciones -->
          <b-card class="mt-3">
            <h4>Listado de edificaciones</h4>
            <div v-if="edificaciones && edificaciones.length">
              <div class="mt-3" v-for="(item, index) of edificaciones" :key="item.nombre+index">
                <div class="alert alert-primary" role="alert">
                  <div class="d-flex justify-content-between align-items-center">
                    <b-row>
                      <b-col xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Nombre:</b> {{item.nombre}}
                        </div>
                      </b-col>
                      <b-col xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Categoría:</b> {{item.categoria}}
                        </div>
                      </b-col>
                      <b-col v-if="item.arquitectura && item.arquitectura.length" xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Arquitectura:</b> {{item.arquitectura}}
                        </div>
                      </b-col>
                      <b-col xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Dirección:</b> {{item.direccion}}
                        </div>
                      </b-col>
                      <b-col v-if="item.dimensionesTerreno && item.dimensionesTerreno.length" xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Dimensiones del terreno:</b> {{item.dimensionesTerreno}} m2
                        </div>
                      </b-col>
                      <b-col v-if="item.divisiones && item.divisiones.length" xl="4" lg="5" md="12" sm="12">
                        <div>
                          <b>Divisiones:</b> {{item.divisiones}}
                        </div>
                      </b-col>
                    </b-row>
                    <div>
                      <button class="btn btn-outline-tertiary btn-sm" @click="abrirModal(item)">
                        <span class="text-white">Editar</span>
                      </button>
                      <button class="btn btn-danger btn-sm ml-2" @click="edificacionEliminar(item._id)">x</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h5 class="m-4">Sin edificaciones registradas</h5>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-modal
        v-model="modalAbrir"
        @ok="edificacionActualizar"
        title="Ingresa los nuevos datos de la edificación"
      >
        <b-row>
          <!-- Reesponsive del formulario -->
          <b-col>
              <label for="nombre">Nombre:</label>
              <input id="nombre" type="text" class="form-control mb-2" v-model.trim="nuevoEdificio.nombre" placeholder="Ingresa el nombre de la edificación">
              <label for="categoria">Categoría:</label>
              <b-form-select @change="delete nuevoEdificio.divisiones" class="mb-2" id="categoria" v-model="categoria" :options="categorias"></b-form-select>
              <span v-if="categoria === 'edificacion'">
                <label for="divisiones">Divisiones:</label>
                <input id="divisiones" type="number" class="form-control mb-2" v-model.number="nuevoEdificio.divisiones" placeholder="Ej: 5 habitaciones / 9 locales / 15 departamentos">
              </span>
              <label for="arquitectura">Arquitectura:</label>
              <input id="arquitectura" type="text" class="form-control mb-2" v-model.trim="nuevoEdificio.arquitectura" placeholder="Clásica / Rustica / Moderna">
              <label for="dimensiones">Dimensión del terreno:</label>
              <input id="dimensiones" type="number" class="form-control mb-2" v-model.number="nuevoEdificio.dimensionTerreno" placeholder="50m^2">
              <label for="tipo">Tipo de edificación:</label>
              <input id="tipo" type="text" class="form-control mb-2" v-model.trim="nuevoEdificio.categoria" placeholder="Residencia / Apartamento / Complejo comercial">
              <label for="direccion">Dirección:</label>
              <b-form-textarea
                class="mb-2"
                id="direccion"
                v-model="nuevoEdificio.direccion"
                placeholder="Ingresa la dirección de la edificación"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
          </b-col>
        </b-row>
      </b-modal>
    </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Edificaciones',
    data(){
        return{
            edificaciones: [],
            edificio: {
              nombre: '',
              categoria: '',
              arquitectura: '',
              direccion: '',
            },
            nuevoEdificio: {
              nombre: '',
              categoria: '',
              arquitectura: '',
              direccion: '',
            },
            categoria: null,
            modalAbrir: false,
            categorias: [
                {value: null, text: 'Seleccione una categoría'},
                {
                  label: 'Edificación: (Apartamento, Residencia, Negocio...)',
                  options: [
                    {value: 'edificacion', text: 'Edificación'}
                  ]
                },
                {
                  label: 'Obra publica: (Calle, Avenida, Puente, Parque, Plaza...)',
                  options: [
                    {value: 'obra', text: 'Obra publica'},
                  ]
                },
                ,
            ],
        }
    },
    methods: {
        abrirModal(item) {
          Object.assign(this.nuevoEdificio, item)
          this.modalAbrir= true;
        },
        edificacionCrear() {
          const This = this;
          if(!this.edificio.nombre.length || !this.edificio.categoria.length 
            || !this.edificio.direccion.length){
            return This.$vToastify
              .info('El nombre, tipo y dirección de la edificación son requeridos')
          }
          const variablesParaPost = {
            nombre: This.edificio.nombre,
            categoria: This.edificio.categoria,
            direccion: This.edificio.direccion,
          }
          if(This.edificio.dimensionTerreno && This.edificio.dimensionTerreno.length){
            Object.assign(variablesParaPost,{
              dimensionTerreno: This.edificio.dimensionTerreno,
            })
          }
          if(This.edificio.dimensionTerreno && This.edificio.dimensionTerreno.length){
            Object.assign(variablesParaPost,{
              dimensionTerreno: This.edificio.dimensionTerreno,
            })
          }
          if(This.edificio.divisiones && This.edificio.divisiones.length){
            Object.assign(variablesParaPost,{
              divisiones: This.edificio.divisiones,
            })
          }
          if(This.edificio.arquitectura && This.edificio.arquitectura.length){
            Object.assign(variablesParaPost,{
              arquitectura: This.edificio.arquitectura,
            })
          }
            axios
              .post('http://localhost:4012/api/crear', variablesParaPost)
              .then((res) => {
                  if(res.status==200){
                  This.$vToastify.success('Edificación agregada satisfactoriamente')
                  This.edificacionesBuscar();
                  This.categoria = null;
                  This.edificio = {
                    nombre: '',
                    categoria: '',
                    arquitectura: '',
                    direccion: '',
                  };
                  }else{
                  This.$vToastify.error("Ha ocurrido un error")
                  }})
              .catch((error) => {
                  This.$vToastify.error("Ha ocurrido un error: ", error)
              })
      },
      edificacionesBuscar() {
        const This= this;
        axios
          .get('http://localhost:4012/api/buscar')
          .then((res) => {
              if(res.status==200){
                This.edificaciones = res.data;
              }else{
                This.$vToastify.error("Ha ocurrido un error obteniendo las edificaciones")
              }})
          .catch((error) => {
              This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      },
      edificacionEliminar(id) {
        const This= this;
        axios
          .delete(`http://localhost:4012/api/eliminar/${id}`)
          .then((res) => {
              if(res.status==200){
                This.edificaciones = This.edificaciones.filter((e) => e._id !== id)
                This.$vToastify.success('Edificación eliminada satisfactoriamente')
              }else{
              This.$vToastify.error("Ha ocurrido un error eliminado la edificación")
              }})
          .catch((error) => {
              This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      },
      edificacionActualizar() {
        if(!this.nuevoEdificio.nombre.length || !this.nuevoEdificio.categoria.length 
          || !this.nuevoEdificio.direccion.length){
          return this.$vToastify
            .info('El nombre, tipo y dirección de la edificación son requeridos')
        }
        const This= this;
        const id = this.nuevoEdificio._id
        const variablesParaPut = {
          nombre: This.nuevoEdificio.nombre,
          categoria: This.nuevoEdificio.categoria,
          direccion: This.nuevoEdificio.direccion,
        }
        if(This.nuevoEdificio.dimensionTerreno && This.nuevoEdificio.dimensionTerreno.length){
          Object.assign(variablesParaPut,{
            dimensionTerreno: This.nuevoEdificio.dimensionTerreno,
          })
        }
        if(This.nuevoEdificio.dimensionTerreno && This.nuevoEdificio.dimensionTerreno.length){
          Object.assign(variablesParaPut,{
            dimensionTerreno: This.nuevoEdificio.dimensionTerreno,
          })
        }
        if(This.nuevoEdificio.divisiones && This.nuevoEdificio.divisiones.length){
          Object.assign(variablesParaPut,{
            divisiones: This.nuevoEdificio.divisiones,
          })
        }
        if(This.nuevoEdificio.arquitectura && This.nuevoEdificio.arquitectura.length){
          Object.assign(variablesParaPut,{
            arquitectura: This.nuevoEdificio.arquitectura,
          })
        }
        axios
          .put(`http://localhost:4012/api/actualizar/${id}`,variablesParaPut)
          .then((res) => {
            if(res.status==200){
              This.edificaciones = This.edificaciones.map((e) => {
                const edificacion = e
                if(e._id === id){
                  Object.assign(edificacion, This.nuevoEdificio)
                }
                return edificacion
              })
              This.categoria = null;
              This.nuevoEdificio = {
                nombre: '',
                categoria: '',
                arquitectura: '',
                direccion: '',
              };
              This.$vToastify.success('Edificación actualizada satisfactoriamente')
            }else{
                This.$vToastify.error("Ha ocurrido un error actualizado la edificación")
            }})
          .catch((error) => {
            This.$vToastify.error("Ha ocurrido un error: ", error)
          })
      }
    },
    mounted: function(){
      this.edificacionesBuscar();
    }
}
</script>
<style>
body {
  background: #b0f2c2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffe4e1, #d8f8e1);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffe4e1, #d8f8e1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>