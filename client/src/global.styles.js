import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    body{
        font-family: 'Open Sans Condensed';
        
        // padding: 1.25rem 3.75rem;

        @media screen and (max-width: 998px){
            // padding: 0.625rem;
            html {
                font-size: 55%
            }
        }
        @media screen and (max-width: 768px){
            // padding: 0.3125rem;
            html {
                font-size: 45%
            }
        }
    }

    a {
        text-decoration: none;
        color: black;
    }

    .page-border {
        padding: 1.25rem 3.75rem;
    }
    .home-page-border {
        padding-left: 1.75rem;
    }
    .page-border-thin {
        padding: 1.25rem 1.75rem;
    }

    .icon-color {
        svg{
            color: #6c757d;
        }
    }
    .snack-alert {
        div{
            background-color: #6c757d;
        }
    }
    .inherited-color {
        background-color: #6c757d;
    }
`;