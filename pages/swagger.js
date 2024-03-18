// pages/swagger.js
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react').then(module => module.default), { ssr: false });

const SwaggerPage = () => {
    return (
        <SwaggerUI url="/api/swagger" />
    );
};

export default SwaggerPage;
