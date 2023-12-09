import { Button, ButtonTypeMap, CircularProgress } from "@mui/material";
interface CustomButtonProps extends ButtonTypeMap {
    children: any;
    loading?: boolean;
    loadingSize?: string | number;
}

const CustomButton = (props: CustomButtonProps) => {
    const loading = props?.loading ? true : false;
    const loadingSize = props?.loadingSize || "20px";
    return loading ? (
        <CircularProgress size={loadingSize} />
    ) : (
        <Button {...props}>{props.children}</Button>
    );
};

export default CustomButton;
