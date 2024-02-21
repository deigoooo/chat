import sessionRouter from '../routers/session.router.js';
import viewRouter from '../routers/view.router.js';

const run = (socketServer,app)=>{
    //utilizo el socket que viene desde el app.js
    app.use((req, res, next) => {
        req.io = socketServer;
        next();
      })
    
    //endpoint
    app.use('/views',viewRouter);
    app.use('/session',sessionRouter);
    app.use('/', (req,res)=>res.redirect('/views/login'));

    //configuro el socket
    socketServer.on("connection", async (socket) => {
        //socketServer.emit("logs", await messageService.getAll());
        console.log(`Nuevo cliente conectado: ${socket.id}`);
        socket.on("productList", async (data) => {
          //const products = await productService.getAll();
          //socketServer.emit("productList", products);
        });
        socket.on("cartUpdate", async (data) => {
          //const cart = await cartService.getProductsFromCartForOnWire(data);
          //socketServer.emit("cartUpdate", cart.response.payload.products);
        });
        socket.on("message", async (data) => {
          //messageService.create(data);
          //socketServer.emit("logs", await messageService.getAll());
        });
        socket.on("updateUser", async (data) => {
          //const users = await userService.getAll();
          //const response = users.map((user) => {
            //return new UserGetDTO(user);
          //});
          //socketServer.emit("updateUser", response);
        });
      });

}

export default run;