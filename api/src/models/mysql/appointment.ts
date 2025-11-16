import { ResultSetHeader } from 'mysql2';
import { getConnection } from '../../config/database';
import { IAppointmentRequest } from '../../interfaces/appointment.interface';

export class AppointmentModel {
  static async getAll() {
    const connection = await getConnection();
    const [appointments] = await connection.query('SELECT * FROM vw_appointments');
    return appointments ?? [];
  }

  static async create(appointmentRequest: IAppointmentRequest) {
    const connection = await getConnection();

    try {
      await connection.beginTransaction();
      const { client, pet, appointment, userId } = appointmentRequest;
      const clientSql = 'INSERT INTO Client (name, phone, email, address) VALUES (?, ?, ?, ?)';
      const [clientResult] = await connection.execute<ResultSetHeader>(clientSql, [
        client.name,
        client.phone,
        client.email,
        client.address,
      ]);

      const clientId = clientResult?.insertId ?? null;
      console.log('✅ client registered with ID:', clientId);

      const petSql =
        'INSERT INTO Pet (client_id, specie_id, gender_id, name, breed, age, weight) VALUES (?, ?, ?, ?, ?, ?, ?)';

      const [petResult] = await connection.execute<ResultSetHeader>(petSql, [
        clientId,
        pet.specie,
        pet.gender,
        pet.name,
        pet.breed,
        pet.age,
        pet.weight,
      ]);

      const petId = petResult?.insertId ?? null;
      console.log('✅ Pet registered with ID:', petId);

      const appointmentSql =
        'INSERT INTO Appointment (date, hour, comments, pet_id, veterinarian_id, reason_id) VALUES (?, ?, ?, ?, ?, ?)';

      const [appointmentResult] = await connection.execute<ResultSetHeader>(appointmentSql, [
        appointment.date,
        appointment.hour,
        appointment.comments,
        petId,
        userId,
        appointment.type,
      ]);

      const appointmentId = appointmentResult?.insertId ?? null;
      await connection.commit();
      return {
        ...appointmentRequest,
        id: appointmentId,
      };
    } catch (error) {
      await connection.rollback();
      return null;
    }
  }
}
