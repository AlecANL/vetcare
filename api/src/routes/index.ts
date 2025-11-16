import { Router } from 'express';
import { appointmentRouter } from './appointments.route';
import { userRouter } from './user.route';
import { authRouter } from './auth.route';
import { historyRouter } from './history.route';
import { productRouter } from './product.route';
import { dashBoardRouter } from './dashboard.route';
import { invoiceRouter } from './invoice.route';

const router = Router();

router.use('/appointments', appointmentRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/history', historyRouter);
router.use('/products', productRouter);
router.use('/dashboard', dashBoardRouter);
router.use('/invoice', invoiceRouter);

export default router;
