#include "client.c"
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

//        if (strcmp(eingabetext, "put") == 0) {
//            char *key = "key1";
//            char *value = "was geht";
//            int *x = put(key, value);
//            write(sockfd, *x, sizeof(put(key, value)));
//        }
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