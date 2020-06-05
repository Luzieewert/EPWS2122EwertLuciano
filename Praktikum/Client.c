#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include <sys/types.h>
#include <sys/socket.h>

#include <netinet/in.h>

#define BUFSIZE 1024
#define PORT 4711

int main() {

    // Socket erstellen
    int sock;
    sock = socket(AF_INET, SOCK_STREAM, 0);


    // Adresse für Socket spezifizieren
    struct sockaddr_in server;
    server.sin_family = AF_INET;
    server.sin_addr.s_addr = INADDR_ANY;
    server.sin_port = htons(PORT);

    int connection = connect(sock, (struct sockaddr *) &server, sizeof(server));
    if (connection == -1)
        printf("socket konnte nicht gebunden werden\n");


    // Daten vom Server erhalten
    char server_response[256]; //Daten vom Server werden hier gespeichert
    recv(sock, &server_response,sizeof(server_response), 0);

    //Erhaltene Daten vom Server
    printf("Der Server sendet die Daten %s\n", server_response);

    // Socket schließen
    close(sock);

    return 0;

};