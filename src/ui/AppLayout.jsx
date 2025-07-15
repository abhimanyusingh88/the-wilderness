import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
const StyledAppLayout= styled.div`
    display: grid ;
    grid-template-columns: 26rem 1fr ;
    grid-template-rows: auto 1fr ;
    height: 100vh;
`

const Main= styled.main`
    /* background-color: green; */
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem, 6.4rem;
    overflow: scroll;
`
const Container= styled.div`
    max-width:110rem;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    gap:3.2rem;

`
function AppLayout()
{
    return(
        <StyledAppLayout>
            {/* <p>AppLayout</p> */}
            <Header/>
            <Sidebar/>
            {/* <Outlet/> */}
            <Main>
                <Container>
            <Outlet/>
            </Container>

            </Main>
            

        </StyledAppLayout>
    )
}
export default AppLayout;