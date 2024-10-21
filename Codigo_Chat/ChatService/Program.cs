using ChatService;
using ChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddSignalR();

// Base de datos para guardar una sola instancia por cada sala
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins("http://localhost:3000") // URL del frontend
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Necesario para SignalR con credenciales
    });
});

var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();                                                     // si estás usando autenticación

// Mapeo del Hub
app.MapHub<ChatHub>("/chat");

app.Run();

