enum user_roles {
    BUSINESS_OWNER = 'business_owner',
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}
export interface SignupRequestDTO {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    repeat_password: string;
}

export interface SignupResponseDTO {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
