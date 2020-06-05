#include <stdio.h>
#include <stdlib.h>
#include <string.h>
//#include <malloc.h>


struct liste {
    char key[10];
    char value[30];
    struct liste *next;
};

struct liste *next = NULL;
struct liste *anfang = NULL;

void put(char *k, char *v) {
    struct liste *zeiger;

    if (anfang == NULL) {
        if ((anfang = malloc(sizeof(struct liste))) == NULL) {
            fprintf(stderr, "Kein Speicherplatz vorhanden\n");
            return;
        } else {
            strcpy(anfang->key, k);
            strcpy(anfang->value, v);
            anfang->next = NULL;
        }
    } else {
        zeiger = anfang;
        while (zeiger->next != NULL)
            zeiger = zeiger->next;
        if ((zeiger->next = malloc(sizeof(struct liste))) == NULL) {
            fprintf(stderr, "Kein Speicherplatz fuer das letzte Listenelement!\n");
            return;
        } else if (strcmp(zeiger->key, k) == 0) {
            strcpy(zeiger->key, k);
            strcpy(zeiger->value, v);
        } else {
            zeiger = zeiger->next;
            strcpy(zeiger->key, k);
            strcpy(zeiger->value, v);

        }
        zeiger->next = NULL;
    }
}


void del(char *k) {
    struct liste *zeiger, *zeiger1;

    if (anfang == NULL) {
        printf("keine Daten vorhanden!\n");
    } else if (anfang != NULL) {
        if (strcmp(anfang->key, k) == 0) {
            zeiger = anfang->next;
            free(anfang);
            anfang = zeiger;
        } else {
            zeiger = anfang;

            while (zeiger->next != NULL) {
                zeiger1 = zeiger->next;
                if (strcmp(zeiger1->key, k) == 0) {
                    zeiger->next = zeiger1->next;
                    free(zeiger1);
                }
                zeiger = zeiger1;
            }
        }
    }
}

int get(char *k, char *r) {
    struct liste *zeiger, *zeiger1;
    r = "-1";

    if (anfang == NULL) {
        printf("keine Daten vorhanden!\n");
    }
     else if (anfang != NULL && strcmp(anfang->key, k) == 0) {
            zeiger = anfang->next;
            printf("key: %s value: %s\n", anfang->key, anfang->value);
            anfang = zeiger;
        } 
        else {
            //fprintf(stderr, "no key\n");
            zeiger = anfang;
            
             while (zeiger->next != NULL) {
                zeiger1 = zeiger->next;
                if (strcmp(zeiger1->key, k) == 0) {
                    zeiger->next = zeiger1->next;
                    printf("key: %s value: %s\n", zeiger1->key, zeiger1->value);
                    r = "0";
                }   
                    zeiger = zeiger1;
                
            } 
            
        }
        
        if(strcmp(r,"-1")== 0){
            printf("no key \n");
            return -1;
            }

            return 0;
        
    }
    //return liste;



void komplette_liste() {
    struct liste *zeiger, *zeiger1;
    zeiger = anfang;

    if (anfang == NULL) {
        printf("liste empty\n");
    }
    while (zeiger != NULL) {
        zeiger1 = zeiger->next;
        printf("key: %s value: %s\n", zeiger->key, zeiger->value);
        zeiger = zeiger1; 
    }

}


int main() {
    struct liste *ausgabe_Liste;
//    komplette_liste();
    put("key1", "value1");
    put("key2", "value2");
    put("key4", "value6");
    put("key7", "value15");
    put("key3", "value3");
    komplette_liste();
    del("key3");
    printf("\n");
    komplette_liste();
    printf("\n");

    get("key3", "");

//    komplette_liste();
//    printf("\n");
//    komplette_liste();
//    put(dkey, dvalue);
//    get(dkey, dvalue);
}



