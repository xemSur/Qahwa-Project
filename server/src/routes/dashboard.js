import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function countByStatus(bookings, status) {
  return bookings.filter((b) => b.status === status).length;
}

router.get("/stats", requireAuth, (req, res) => {
  const data = db.load();
  const bookings = data.bookings;

  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

  const averageRating = data.providers.length
    ? data.providers.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / data.providers.length
    : 0;

  res.json({
    data: {
      totalProviders: data.providers.length,
      totalBookings: bookings.length,
      pendingBookings: countByStatus(bookings, "PENDING"),
      confirmedBookings: countByStatus(bookings, "CONFIRMED"),
      completedBookings: countByStatus(bookings, "COMPLETED"),
      cancelledBookings: countByStatus(bookings, "CANCELLED"),
      totalPackages: data.packages.length,
      totalTestimonials: data.testimonials.length,
      unreadMessages: data.messages?.length || 0,
      totalRevenue,
      averageRating: Math.round(averageRating * 10) / 10,
    },
  });
});

export default router;
