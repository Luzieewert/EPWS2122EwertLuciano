#include <stdio.h>
#include <stdlib.h>
#include <string.h>


#include <sys/socket.h>
#include <sys/types.h>

#include <netdb.h>
#include <netinet/in.h>

#include <unistd.h>

#define PORT 4711
#define ENDLOSSCHLEIFE 1
#define BUFSIZE 1024

#include "Datenhaltung.c"


int telnet(int sockfd) {
    char eingabetext[BUFSIZE];
    int n;
    for (;;) {
        printf("enter put, get or del:");
        bzero(eingabetext, sizeof(eingabetext));
        n = 0;

        while ((eingabetext[n++] = getchar()) != '\n');
        write(sockfd, eingabetext, sizeof(eingabetext));
        bzero(eingabetext, sizeof(eingabetext));
        read(sockfd, eingabetext, sizeof(eingabetext));
        printf("From Server: %s", eingabetext);

        if (strcmp(eingabetext, "put") == 0) {
            char *key = "key1";
            char *value = "was geht";
            int *x = put(key, value);
            write(sockfd, *x, sizeof(put(key, value)));
        }
        if (strcmp(eingabetext, "get") == 0) {
            komplette_liste();
            break;

        }

        if (strncmp(eingabetext, "exit", 4) == 0) {
            printf("Server Exit...\n");
            break;
        }
    }
    return 0;
}

int client() {
    int sockfd;

    struct sockaddr_in server_address;
    sockfd = socket(AF_INET, SOCK_STREAM, 0);


    if (sockfd < 0) {
        printf("socket creation failed...\n");
        exit(0);
    } else {
        printf("socket wurde erstellt\n");
    }

    server_address.sin_family = AF_INET;
    server_address.sin_port = htons(PORT);
    server_address.sin_addr.s_addr = INADDR_ANY;

//    printf("%d", sockfd);

    int connection_status = connect(sockfd, (struct sockaddr *) &server_address, sizeof(server_address));

    if (connection_status < 0) {
        printf("There was an error making a connection to the remote socket \n\n");
        exit(0);
    } else {
        printf("verbunden mit server..\n");
    }

//    telnet(sockfd);

//    close(sockfd);

    return sockfd;
}



