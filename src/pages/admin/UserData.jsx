import React, { useMemo } from "react";
import SidebarModule from "../../modules/admin/SidebarModule";
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { users } from '../../data/testdata'

function countUser(users) {
    return users.filter(user => users.active).length;
}

function UserData () {
    


    const count = useMemo(() => countUser(users) , [users]); 

    return(
        <SidebarModule>
            <Box
                sx={{
                    height: 400,
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 3,
                        mb: 3
                    }}
                >
                    
                    Manage Users
                </Box>
                
            </Box>
        </SidebarModule>
    );
}

export default UserData;