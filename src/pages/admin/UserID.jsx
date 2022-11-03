import React, { useEffect, useState } from "react";
import SidebarModule from "../../modules/admin/SidebarModule";
import { Typography, Avatar, Stack, TextField, Autocomplete,   FormGroup,
    FormControlLabel, Checkbox, CircularProgress, circularProgressClasses } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const top100Films = [
    { label: '회장' },
    { label: '부회장' },
    { label: '팀장' },
    { label: '부장' },
    { label: '과장' },
    { label: "사원" },
    { label: '대리' },
]

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));



function UserID() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        // axios.get('http://52.79.125.202:8881/officegoing')
        // .then((res) => {
            //const {email, name, userApplication, userPosition, employeeId, officeGoing } = res
        //   console.log(res)
        // })
      }, []);

      const [value, setValue] = React.useState(dayjs('2022-04-07'));

//////
const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value.startOf('week');
    const end = value.endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };
    ///////
  


  return (
    <SidebarModule>
        <Stack direction="row" spacing={4}>
            <Card sx={{ minWidth: 350, maxWidth: 400, height: '800px' }}>
                <CardContent>
                    <Stack spacing={4}>
                        <Box>
                            <Avatar alt="" src="" sx={{ width: 350, height: 350 }}/>
                        </Box>
                        <Box sx={{textAlign: 'center'}}>
                        <Stack spacing={4}>
                            <Box>
                                <TextField required
                                sx={{ width : 300}}
                                    id="outlined-required" defaultValue="이창학" label="이름" />
                            </Box>
                            <Box>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    defaultValue="사원"
                                    options={top100Films}
                                    renderInput={(params) => <TextField required sx={{ width : 300}} {...params} label="직급" />}
                                />
                            </Box>
                        </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 800, maxWidth: 800, height: '800px' }}>
                <CardContent>
                    
                
                </CardContent>
            </Card>
            <Stack spacing={4}>
            <Card sx={{ minWidth: 350, maxWidth: 400, height: '384px' }}>
                <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        label="Week picker"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderDay={renderWeekPickerDay}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="'Week of' MMM d"
                    />
                    </LocalizationProvider>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: 350, maxWidth: 400, height: '384px', zIndex: '1000' }}>
                <CardContent>
                
                <TextField
                    sx={{ width: 750 }}
                    id="standard-basic"
                    label="Todo"
                    variant="filled"
                    onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        setTodos((props) => [
                        ...props,
                        { id: props.length, title: e.target.value, done: false },
                        ]);
                    }
                    }}
                />
                <FormGroup>
                    {todos.map((todo) => (
                    <FormControlLabel
                        key={todo.id}
                        control={todo.done ? <Checkbox defaultChecked /> : <Checkbox />}
                        label={todo.title}
                    />
                    ))}
                </FormGroup>
                </CardContent>
            </Card>
            </Stack>
        </Stack>
    </SidebarModule>
  );
}

export default UserID;
