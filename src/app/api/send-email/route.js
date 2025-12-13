// src/app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📨 Données reçues pour Éclat Beauté Spa:', body);

    const { 
      name = '', 
      email = '', 
      phone = '', 
      treatment = '',
      therapist = '', 
      date = '',
      time = '',
      preferences = '',
      message = ''
    } = body;

    // Validation des données requises
    if (!name || !email || !phone || !treatment) {
      console.error('❌ Données manquantes:', { name, email, phone, treatment });
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Vérifier la connexion SMTP
    await transporter.verify();
    console.log('✅ Connexion SMTP établie');

    // Mapper les types de soins
    const treatmentTypes = {
      'soin-visage': 'Soin du Visage',
      'massage': 'Massage Relaxant',
      'rituel': 'Rituel Signature',
      'forfait': 'Forfait Journée',
      'autre': 'Autre'
    };

    const therapistNames = {
      'elise': 'Élise Moreau (Esthéticienne Diplômée)',
      'sophie': 'Sophie Dubois (Massothérapeute)',
      'camille': 'Camille Laurent (Spécialiste Bien-être)'
    };

    const treatmentLabel = treatmentTypes[treatment] || treatment;
    const therapistLabel = therapistNames[therapist] || 'Thérapeute disponible';
    const reference = `SPA-${Date.now().toString().slice(-8)}`;
    const today = new Date();
    const confirmationDeadline = new Date(today);
    confirmationDeadline.setHours(confirmationDeadline.getHours() + 2);

    // Email pour l'administrateur (Spa)
    const adminEmail = {
      from: `"Éclat Beauté Spa" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'reservation@eclatbeaute.fr',
      replyTo: email,
      subject: `💖 NOUVELLE RÉSERVATION #${reference} - ${name} - ${treatmentLabel}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouvelle Réservation - Éclat Beauté Spa</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                body {
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    padding: 20px;
                    min-height: 100vh;
                }
                
                .email-container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 32px;
                    overflow: hidden;
                    box-shadow: 0 25px 70px rgba(236, 72, 153, 0.15);
                }
                
                /* Header */
                .header {
                    background: linear-gradient(135deg, #db2777 0%, #ec4899 100%);
                    padding: 50px 40px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".15" fill="white"/></svg>');
                    background-size: cover;
                    opacity: 0.1;
                }
                
                .logo-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 25px;
                    margin-bottom: 35px;
                    position: relative;
                }
                
                .logo-circle {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }
                
                .logo-text {
                    text-align: left;
                }
                
                .spa-name {
                    color: white;
                    font-size: 38px;
                    font-weight: 300;
                    letter-spacing: -0.5px;
                    font-family: serif;
                }
                
                .spa-tagline {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 18px;
                    font-weight: 400;
                    letter-spacing: 1px;
                }
                
                .reference-badge {
                    background: rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255, 255, 255, 0.35);
                    color: white;
                    padding: 15px 35px;
                    border-radius: 50px;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 1.5px;
                    display: inline-block;
                    margin-top: 25px;
                }
                
                /* Status Section */
                .status-section {
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    padding: 35px;
                    text-align: center;
                    border-bottom: 1px solid #fbcfe8;
                }
                
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: linear-gradient(135deg, #db2777 0%, #ec4899 100%);
                    color: white;
                    padding: 15px 35px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 18px;
                }
                
                /* Main Content */
                .main-content {
                    padding: 50px 40px;
                }
                
                .section-title {
                    color: #db2777;
                    font-size: 24px;
                    font-weight: 400;
                    margin: 50px 0 30px;
                    padding-bottom: 20px;
                    border-bottom: 3px solid #fbcfe8;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-family: serif;
                }
                
                /* Client Info Grid */
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 25px;
                    margin-bottom: 40px;
                }
                
                .info-card {
                    background: #fdf2f8;
                    border-radius: 24px;
                    padding: 30px;
                    border: 1px solid #fbcfe8;
                    transition: all 0.4s ease;
                }
                
                .info-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(236, 72, 153, 0.12);
                }
                
                .info-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 25px;
                }
                
                .info-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 28px;
                }
                
                .info-title {
                    color: #9d174d;
                    font-size: 20px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                
                .info-content {
                    color: #6b7280;
                    font-size: 16px;
                    line-height: 1.8;
                }
                
                .info-field {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 18px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #fce7f3;
                }
                
                .info-field:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                
                .field-label {
                    color: #9d174d;
                    font-size: 15px;
                    font-weight: 600;
                    min-width: 160px;
                    opacity: 0.8;
                }
                
                .field-value {
                    color: #374151;
                    font-size: 17px;
                    font-weight: 500;
                }
                
                /* Priority Section */
                .priority-section {
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    border: 2px solid #f472b6;
                    border-radius: 28px;
                    padding: 40px;
                    margin: 50px 0;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .priority-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 5px;
                    background: linear-gradient(90deg, #ec4899 0%, #db2777 100%);
                }
                
                .priority-title {
                    color: #db2777;
                    font-size: 28px;
                    font-weight: 400;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 18px;
                    font-family: serif;
                }
                
                .priority-time {
                    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
                    color: white;
                    padding: 12px 30px;
                    border-radius: 50px;
                    font-size: 15px;
                    font-weight: 600;
                    display: inline-block;
                    margin-top: 20px;
                    letter-spacing: 1px;
                }
                
                /* Action Buttons */
                .action-buttons {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                    margin: 35px 0;
                }
                
                .action-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    padding: 20px 28px;
                    border-radius: 16px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: none;
                    cursor: pointer;
                }
                
                .btn-call {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                }
                
                .btn-email {
                    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
                    color: white;
                }
                
                .btn-whatsapp {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: white;
                }
                
                .action-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }
                
                /* Treatment Details */
                .treatment-details {
                    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                    border-radius: 24px;
                    padding: 35px;
                    margin: 40px 0;
                    border: 2px solid #86efac;
                }
                
                .treatment-title {
                    color: #065f46;
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 25px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                /* Footer */
                .footer {
                    background: linear-gradient(135deg, #831843 0%, #9d174d 100%);
                    color: white;
                    padding: 50px 40px;
                    text-align: center;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 35px;
                    margin-bottom: 35px;
                }
                
                .footer-section h4 {
                    color: white;
                    font-size: 20px;
                    font-weight: 500;
                    margin-bottom: 25px;
                    font-family: serif;
                }
                
                .footer-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: #fbcfe8;
                    font-size: 15px;
                }
                
                .copyright {
                    border-top: 1px solid rgba(255, 255, 255, 0.15);
                    padding-top: 30px;
                    color: #f9a8d4;
                    font-size: 14px;
                    line-height: 1.8;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .header { padding: 35px 25px; }
                    .main-content { padding: 35px 25px; }
                    .info-grid { grid-template-columns: 1fr; }
                    .action-buttons { grid-template-columns: 1fr; }
                    .priority-section { padding: 30px 25px; }
                    .footer-content { grid-template-columns: 1fr; }
                    
                    .logo-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 15px;
                    }
                    
                    .logo-text {
                        text-align: center;
                    }
                    
                    .spa-name {
                        font-size: 32px;
                    }
                    
                    .section-title {
                        font-size: 22px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="header">
                    <div class="logo-section">
                        <div class="logo-circle">
                            <div style="font-size: 32px; color: white;">💖</div>
                        </div>
                        <div class="logo-text">
                            <div class="spa-name">Éclat Beauté</div>
                            <div class="spa-tagline">Spa & Wellness</div>
                        </div>
                    </div>
                    
                    <div class="reference-badge">
                        NOUVELLE RÉSERVATION • #${reference}
                    </div>
                </div>

                <!-- Status Section -->
                <div class="status-section">
                    <div class="status-badge">
                        💆‍♀️ RÉSERVATION ${treatment === 'massage' ? 'MASSAGE' : 'SOIN'}
                        <span style="font-size: 14px; opacity: 0.9;">
                            ${treatmentLabel}
                        </span>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="main-content">
                    <!-- Client Information -->
                    <div class="section-title">
                        👤 Information Client
                    </div>
                    
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-header">
                                <div class="info-icon">👤</div>
                                <div class="info-title">Identité</div>
                            </div>
                            <div class="info-content">
                                <div class="info-field">
                                    <span class="field-label">Nom complet</span>
                                    <span class="field-value">${name}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Téléphone</span>
                                    <span class="field-value">
                                        <a href="tel:${phone}" style="color: #db2777; text-decoration: none; font-weight: 600;">
                                            ${phone}
                                        </a>
                                    </span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Email</span>
                                    <span class="field-value">
                                        <a href="mailto:${email}" style="color: #db2777; text-decoration: none; font-weight: 600;">
                                            ${email}
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-header">
                                <div class="info-icon">💆‍♀️</div>
                                <div class="info-title">Préférences</div>
                            </div>
                            <div class="info-content">
                                <div class="info-field">
                                    <span class="field-label">Type de soin</span>
                                    <span class="field-value" style="color: #db2777; font-weight: 600;">
                                        ${treatmentLabel}
                                    </span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Thérapeute</span>
                                    <span class="field-value">${therapistLabel}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Préférences</span>
                                    <span class="field-value">${preferences || 'Aucune préférence spécifique'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Appointment Details -->
                    <div class="section-title">
                        📅 Détails de la Réservation
                    </div>
                    
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-header">
                                <div class="info-icon">💖</div>
                                <div class="info-title">Soin choisi</div>
                            </div>
                            <div class="info-content">
                                <div class="info-field">
                                    <span class="field-label">Type</span>
                                    <span class="field-value" style="color: #8b5cf6; font-weight: 600; background: #f5f3ff; padding: 8px 16px; border-radius: 12px;">
                                        ${treatmentLabel}
                                    </span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Thérapeute souhaité</span>
                                    <span class="field-value">${therapistLabel}</span>
                                </div>
                                ${date ? `
                                <div class="info-field">
                                    <span class="field-label">Date souhaitée</span>
                                    <span class="field-value">${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                ` : ''}
                                ${time ? `
                                <div class="info-field">
                                    <span class="field-label">Horaire souhaité</span>
                                    <span class="field-value">${time}</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-header">
                                <div class="info-icon">📊</div>
                                <div class="info-title">Métadonnées</div>
                            </div>
                            <div class="info-content">
                                <div class="info-field">
                                    <span class="field-label">Référence</span>
                                    <span class="field-value" style="color: #ec4899; font-weight: 600;">#${reference}</span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Date de demande</span>
                                    <span class="field-value">
                                        ${today.toLocaleDateString('fr-FR', { 
                                            weekday: 'long',
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div class="info-field">
                                    <span class="field-label">Heure</span>
                                    <span class="field-value">
                                        ${today.toLocaleTimeString('fr-FR', { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Client Preferences -->
                    ${preferences ? `
                    <div class="section-title">
                        🌸 Préférences du Client
                    </div>
                    
                    <div class="info-card">
                        <div class="info-content" style="background: #fdf2f8; padding: 25px; border-radius: 20px; border: 2px solid #fbcfe8;">
                            <div style="white-space: pre-wrap; line-height: 1.8; color: #9d174d; font-size: 16px;">
                                ${preferences}
                            </div>
                            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #fbcfe8; color: #ec4899; font-size: 14px; display: flex; gap: 20px; flex-wrap: wrap;">
                                <span>📝 ${preferences.length} caractères</span>
                                <span>🔤 ${preferences.split(' ').length} mots</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    ${message ? `
                    <div class="section-title">
                        💌 Message du Client
                    </div>
                    
                    <div class="info-card">
                        <div class="info-content" style="background: #f0fdf4; padding: 25px; border-radius: 20px; border: 2px solid #86efac;">
                            <div style="white-space: pre-wrap; line-height: 1.8; color: #065f46; font-size: 16px;">
                                ${message}
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Priority Action -->
                    <div class="priority-section">
                        <div class="priority-title">
                            ⏱️ ACTION REQUISE
                        </div>
                        
                        <div style="color: #9d174d; font-size: 20px; margin-bottom: 25px; font-weight: 500;">
                            Contacter le client avant ${confirmationDeadline.toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </div>
                        
                        <div class="priority-time">
                            DÉLAI DE CONFIRMATION : 2 HEURES
                        </div>
                        
                        <div class="action-buttons" style="margin-top: 35px;">
                            <a href="tel:${phone}" class="action-btn btn-call">
                                📞 Appeler le client
                            </a>
                            <a href="mailto:${email}" class="action-btn btn-email">
                                📧 Envoyer un email
                            </a>
                            <a href="https://wa.me/${phone.replace(/\D/g, '')}" class="action-btn btn-whatsapp">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>

                    <!-- Treatment Preparation -->
                    <div class="treatment-details">
                        <div class="treatment-title">
                            🧴 Préparation du Soin
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #86efac;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span>🛁</span>
                                    <span>Douche avant le soin</span>
                                </div>
                                <div style="color: #374151; font-size: 14px;">Prise de douche avant l'arrivée au spa</div>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #86efac;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span>⌚</span>
                                    <span>Arriver 15 min avant</span>
                                </div>
                                <div style="color: #374151; font-size: 14px;">Pour une expérience relaxante complète</div>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid #86efac;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span>📱</span>
                                    <span>Téléphone en mode silencieux</span>
                                </div>
                                <div style="color: #374151; font-size: 14px;">Pour une immersion totale dans le bien-être</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>Éclat Beauté Spa</h4>
                            <div style="color: #fbcfe8; line-height: 1.7; font-size: 15px;">
                                Sanctuaire de bien-être où le luxe rencontre la sérénité.<br>
                                Des soins d'exception pour révéler votre beauté naturelle.
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Contact</h4>
                            <div class="footer-contact">
                                <div class="contact-item">
                                    <span>📞</span>
                                    <a href="tel:0123456789" style="color: #fbcfe8; text-decoration: none;">
                                        01 23 45 67 89
                                    </a>
                                </div>
                                <div class="contact-item">
                                    <span>📧</span>
                                    <a href="mailto:reservation@eclatbeaute.fr" style="color: #fbcfe8; text-decoration: none;">
                                        reservation@eclatbeaute.fr
                                    </a>
                                </div>
                                <div class="contact-item">
                                    <span>📍</span>
                                    <span>16 Avenue Montaigne, 75008 Paris</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Horaires</h4>
                            <div style="color: #fbcfe8; font-size: 15px; line-height: 1.8;">
                                <div>Lundi - Vendredi : 9h-20h</div>
                                <div>Samedi : 9h-19h</div>
                                <div>Dimanche : 10h-18h</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="copyright">
                        © ${today.getFullYear()} Éclat Beauté Spa & Wellness. Tous droits réservés.<br>
                        Système de gestion des réservations • Référence : #${reference}
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `NOUVELLE RÉSERVATION - ÉCLAT BEAUTÉ SPA
===========================================
Référence: #${reference}
Date: ${today.toLocaleDateString('fr-FR')}
Heure: ${today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}

💖 TYPE DE SOIN: ${treatmentLabel.toUpperCase()}

CLIENT:
• Nom: ${name}
• Email: ${email}
• Téléphone: ${phone}
• Préférences: ${preferences || 'Aucune'}

RÉSERVATION:
• Type: ${treatmentLabel}
• Thérapeute: ${therapistLabel}
${date ? `• Date souhaitée: ${new Date(date).toLocaleDateString('fr-FR')}` : ''}
${time ? `• Horaire souhaité: ${time}` : ''}

${preferences ? `PRÉFÉRENCES DU CLIENT:
${preferences}
` : ''}${message ? `MESSAGE DU CLIENT:
${message}
` : ''}ACTION REQUISE:
Contacter le client avant ${confirmationDeadline.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}

CONTACT RAPIDE:
• Téléphone: ${phone}
• Email: ${email}
• WhatsApp: https://wa.me/${phone.replace(/\D/g, '')}

Éclat Beauté Spa
📞 01 23 45 67 89
📧 reservation@eclatbeaute.fr
📍 16 Avenue Montaigne, 75008 Paris
🕐 Du lundi au samedi, 9h-20h`
    };

    // Email de confirmation pour le client
    const clientEmail = {
      from: `"Éclat Beauté Spa" <${process.env.SMTP_USER}>`,
      to: email,
      cc: process.env.ADMIN_EMAIL || 'reservation@eclatbeaute.fr',
      subject: `💖 Confirmation de votre réservation #${reference} - Éclat Beauté Spa`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation Réservation - Éclat Beauté Spa</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                body {
                    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #374151;
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    padding: 20px;
                    min-height: 100vh;
                }
                
                .email-container {
                    max-width: 700px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 32px;
                    overflow: hidden;
                    box-shadow: 0 25px 70px rgba(236, 72, 153, 0.15);
                }
                
                /* Header */
                .header {
                    background: linear-gradient(135deg, #db2777 0%, #ec4899 100%);
                    padding: 60px 40px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .confirmation-circle {
                    width: 120px;
                    height: 120px;
                    background: rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(10px);
                    border: 3px solid rgba(255, 255, 255, 0.35);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 35px;
                }
                
                .confirmation-check {
                    font-size: 56px;
                    color: white;
                }
                
                .confirmation-title {
                    color: white;
                    font-size: 42px;
                    font-weight: 300;
                    margin-bottom: 20px;
                    letter-spacing: -0.5px;
                    font-family: serif;
                }
                
                .confirmation-subtitle {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 20px;
                    font-weight: 400;
                    letter-spacing: 1px;
                }
                
                /* Content */
                .content {
                    padding: 50px 40px;
                }
                
                .greeting {
                    text-align: center;
                    margin-bottom: 50px;
                }
                
                .greeting h2 {
                    color: #db2777;
                    font-size: 32px;
                    margin-bottom: 15px;
                    font-weight: 400;
                    font-family: serif;
                }
                
                .greeting p {
                    color: #6b7280;
                    font-size: 18px;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.8;
                }
                
                /* Summary Card */
                .summary-card {
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    border-radius: 28px;
                    padding: 40px;
                    margin-bottom: 50px;
                    border: 2px solid #fbcfe8;
                }
                
                .summary-title {
                    color: #db2777;
                    font-size: 26px;
                    font-weight: 400;
                    margin-bottom: 35px;
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    font-family: serif;
                }
                
                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 30px;
                }
                
                .summary-item {
                    background: white;
                    padding: 25px;
                    border-radius: 20px;
                    box-shadow: 0 8px 25px rgba(236, 72, 153, 0.08);
                    border: 1px solid #fbcfe8;
                }
                
                .item-label {
                    color: #9d174d;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                    opacity: 0.8;
                }
                
                .item-value {
                    color: #374151;
                    font-size: 20px;
                    font-weight: 500;
                }
                
                .reference-highlight {
                    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                }
                
                /* Timeline */
                .timeline-section {
                    margin: 50px 0;
                }
                
                .section-title {
                    color: #db2777;
                    font-size: 26px;
                    font-weight: 400;
                    margin-bottom: 35px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-family: serif;
                }
                
                .timeline {
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 25px;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(to bottom, #ec4899, #db2777);
                }
                
                .timeline-item {
                    position: relative;
                    padding-left: 70px;
                    margin-bottom: 45px;
                }
                
                .timeline-item:last-child {
                    margin-bottom: 0;
                }
                
                .timeline-icon {
                    position: absolute;
                    left: 0;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    z-index: 2;
                    border: 3px solid white;
                    box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
                }
                
                .timeline-content {
                    background: white;
                    padding: 25px;
                    border-radius: 20px;
                    border: 2px solid #fce7f3;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                }
                
                .timeline-step {
                    color: #db2777;
                    font-weight: 600;
                    font-size: 18px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .step-number {
                    background: #ec4899;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 600;
                }
                
                /* Contact Card */
                .contact-card {
                    background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
                    border-radius: 28px;
                    padding: 40px;
                    margin: 50px 0;
                    text-align: center;
                    border: 2px solid #fbcfe8;
                }
                
                .contact-title {
                    color: #db2777;
                    font-size: 28px;
                    font-weight: 400;
                    margin-bottom: 25px;
                    font-family: serif;
                }
                
                .contact-buttons {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 30px;
                    flex-wrap: wrap;
                }
                
                .contact-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 30px;
                    border-radius: 16px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 15px;
                    transition: all 0.3s ease;
                }
                
                .btn-phone {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                }
                
                .btn-email {
                    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
                    color: white;
                }
                
                .btn-whatsapp {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    color: white;
                }
                
                .contact-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
                }
                
                /* Important Information */
                .important-info {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    border-radius: 24px;
                    padding: 35px;
                    margin: 40px 0;
                    border: 2px solid #fbbf24;
                }
                
                .important-title {
                    color: #92400e;
                    font-weight: 600;
                    font-size: 20px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                /* Footer */
                .footer {
                    background: linear-gradient(135deg, #831843 0%, #9d174d 100%);
                    color: white;
                    padding: 50px 40px;
                    text-align: center;
                }
                
                .footer-logo {
                    font-size: 28px;
                    font-weight: 300;
                    margin-bottom: 25px;
                    color: white;
                    font-family: serif;
                }
                
                .footer-tagline {
                    color: #fbcfe8;
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 30px;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .copyright {
                    border-top: 1px solid rgba(255, 255, 255, 0.15);
                    padding-top: 30px;
                    color: #f9a8d4;
                    font-size: 14px;
                    line-height: 1.8;
                }
                
                @media (max-width: 768px) {
                    .header { padding: 40px 25px; }
                    .content { padding: 35px 25px; }
                    .summary-grid { grid-template-columns: 1fr; }
                    .contact-buttons { flex-direction: column; }
                    .confirmation-title { font-size: 36px; }
                    .timeline::before { left: 20px; }
                    .timeline-item { padding-left: 55px; }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="header">
                    <div class="confirmation-circle">
                        <div class="confirmation-check">💖</div>
                    </div>
                    <h1 class="confirmation-title">Votre demande est confirmée</h1>
                    <p class="confirmation-subtitle">
                        L'art du bien-être vous attend
                    </p>
                </div>

                <!-- Content -->
                <div class="content">
                    <!-- Greeting -->
                    <div class="greeting">
                        <h2>Cher(e) ${name},</h2>
                        <p>
                            Nous avons bien reçu votre demande de réservation pour un 
                            <strong>${treatmentLabel.toLowerCase()}</strong>.
                            Notre équipe vous contactera très prochainement pour finaliser votre rendez-vous.
                        </p>
                    </div>

                    <!-- Summary Card -->
                    <div class="summary-card">
                        <div class="summary-title">
                            📋 Récapitulatif de votre demande
                        </div>
                        
                        <div class="summary-grid">
                            <div class="summary-item">
                                <div class="item-label">Référence</div>
                                <div class="item-value">
                                    <span class="reference-highlight">#${reference}</span>
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="item-label">Type de soin</div>
                                <div class="item-value" style="color: #8b5cf6;">
                                    ${treatmentLabel}
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="item-label">Thérapeute</div>
                                <div class="item-value">${therapistLabel}</div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="item-label">Date de demande</div>
                                <div class="item-value">
                                    ${today.toLocaleDateString('fr-FR', { 
                                        weekday: 'long',
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="item-label">Heure</div>
                                <div class="item-value">
                                    ${today.toLocaleTimeString('fr-FR', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </div>
                            </div>
                            
                            <div class="summary-item">
                                <div class="item-label">Statut</div>
                                <div class="item-value">
                                    <span style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 14px;">
                                        ⏳ En attente de confirmation
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Timeline -->
                    <div class="timeline-section">
                        <h3 class="section-title">
                            🔄 Prochaines étapes
                        </h3>
                        
                        <div class="timeline">
                            <div class="timeline-item">
                                <div class="timeline-icon">📞</div>
                                <div class="timeline-content">
                                    <div class="timeline-step">
                                        <span class="step-number">1</span>
                                        Appel de confirmation
                                    </div>
                                    <p style="color: #6b7280; font-size: 16px;">
                                        Notre conseillère bien-être vous appellera dans les 
                                        <strong>2 heures</strong> pour confirmer les détails.
                                    </p>
                                </div>
                            </div>
                            
                            <div class="timeline-item">
                                <div class="timeline-icon">📅</div>
                                <div class="timeline-content">
                                    <div class="timeline-step">
                                        <span class="step-number">2</span>
                                        Prise de rendez-vous
                                    </div>
                                    <p style="color: #6b7280; font-size: 16px;">
                                        Définition de la date et heure selon vos disponibilités.
                                    </p>
                                </div>
                            </div>
                            
                            <div class="timeline-item">
                                <div class="timeline-icon">💆‍♀️</div>
                                <div class="timeline-content">
                                    <div class="timeline-step">
                                        <span class="step-number">3</span>
                                        Préparation du soin
                                    </div>
                                    <p style="color: #6b7280; font-size: 16px;">
                                        Conseils personnalisés pour optimiser votre expérience bien-être.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Card -->
                    <div class="contact-card">
                        <div class="contact-title">
                            📞 Besoin d'une réponse rapide ?
                        </div>
                        <p style="color: #db2777; margin-bottom: 25px; font-size: 18px;">
                            Notre équipe est disponible pour répondre à vos questions
                        </p>
                        <div class="contact-buttons">
                            <a href="tel:0123456789" class="contact-btn btn-phone">
                                📱 01 23 45 67 89
                            </a>
                            <a href="mailto:reservation@eclatbeaute.fr" class="contact-btn btn-email">
                                📧 reservation@eclatbeaute.fr
                            </a>
                            <a href="https://wa.me/0123456789" class="contact-btn btn-whatsapp">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>

                    <!-- Important Information -->
                    <div class="important-info">
                        <div class="important-title">
                            ℹ️ Pour une expérience optimale
                        </div>
                        <div style="color: #92400e; font-size: 16px; line-height: 1.8;">
                            • Arrivez 15 minutes avant votre rendez-vous pour une transition en douceur<br>
                            • Pensez à prendre une douche avant votre arrivée<br>
                            • Mettez votre téléphone en mode silencieux pour une immersion totale<br>
                            • Portez des vêtements confortables pour les massages<br>
                            • Évitez les bijoux pour les soins du visage
                        </div>
                    </div>

                    <!-- Wellness Tips -->
                    <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 24px; padding: 35px; margin: 40px 0; border: 2px solid #a7f3d0;">
                        <h3 style="color: #065f46; font-size: 22px; margin-bottom: 25px; font-weight: 500; display: flex; align-items: center; gap: 15px;">
                            🌿 Astuces bien-être
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 16px;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px;">💧 Hydratation</div>
                                <div style="color: #374151; font-size: 14px;">Buvez beaucoup d'eau après votre soin</div>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 16px;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px;">🍵 Relaxation</div>
                                <div style="color: #374151; font-size: 14px;">Profitez de notre thé signature offert</div>
                            </div>
                            <div style="background: white; padding: 20px; border-radius: 16px;">
                                <div style="color: #059669; font-weight: 600; margin-bottom: 10px;">✨ Routine</div>
                                <div style="color: #374151; font-size: 14px;">Nos conseils pour prolonger les bénéfices</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-logo">Éclat Beauté Spa</div>
                    <p class="footer-tagline">
                        Sanctuaire de bien-être où le luxe rencontre la sérénité<br>
                        Des soins d'exception pour révéler votre beauté naturelle
                    </p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; margin: 30px 0; color: #fbcfe8; font-size: 15px;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">📞 Contact</div>
                            <div>01 23 45 67 89</div>
                            <div>reservation@eclatbeaute.fr</div>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">📍 Adresse</div>
                            <div>16 Avenue Montaigne</div>
                            <div>75008 Paris</div>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">🕐 Horaires</div>
                            <div>Lun-Ven : 9h-20h</div>
                            <div>Sam : 9h-19h</div>
                            <div>Dim : 10h-18h</div>
                        </div>
                    </div>
                    
                    <div class="copyright">
                        © ${today.getFullYear()} Éclat Beauté Spa & Wellness. Tous droits réservés.<br>
                        Référence : #${reference} • ${today.toLocaleDateString('fr-FR')}
                    </div>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `CHER(E) ${name.toUpperCase()},

VOTRE DEMANDE DE RÉSERVATION EST CONFIRMÉE

Nous avons bien reçu votre demande de réservation pour un ${treatmentLabel.toLowerCase()}.
Notre équipe bien-être vous contactera très prochainement.

📋 RÉCAPITULATIF:
• Référence : #${reference}
• Type de soin : ${treatmentLabel}
• Thérapeute : ${therapistLabel}
• Date de demande : ${today.toLocaleDateString('fr-FR')}
• Heure : ${today.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
• Statut : En attente de confirmation

🔄 PROCHAINES ÉTAPES:
1. Appel de confirmation de notre conseillère
   (dans les 2 heures)
2. Prise de rendez-vous définitive
3. Conseils personnalisés pour votre soin

📞 CONTACT RAPIDE:
• Téléphone : 01 23 45 67 89
• Email : reservation@eclatbeaute.fr
• WhatsApp : 01 23 45 67 89

ℹ️ POUR UNE EXPÉRIENCE OPTIMALE:
• Arrivez 15 minutes avant votre rendez-vous
• Pensez à prendre une douche avant votre arrivée
• Mettez votre téléphone en mode silencieux
• Portez des vêtements confortables
• Évitez les bijoux pour les soins du visage

🌿 ASTUCES BIEN-ÊTRE:
• Hydratation : Buvez beaucoup d'eau après votre soin
• Relaxation : Profitez de notre thé signature offert
• Routine : Nos conseils pour prolonger les bénéfices

Merci de votre confiance.
L'équipe de l'Éclat Beauté Spa

--
Éclat Beauté Spa & Wellness
📍 16 Avenue Montaigne, 75008 Paris
📞 01 23 45 67 89
📧 reservation@eclatbeaute.fr
🕐 Lun-Ven : 9h-20h, Sam : 9h-19h, Dim : 10h-18h`
    };

    // Envoi des emails
    console.log('📤 Envoi des emails...');
    
    await transporter.sendMail(adminEmail);
    console.log('✅ Email admin envoyé');
    
    await transporter.sendMail(clientEmail);
    console.log('✅ Email client envoyé');

    return NextResponse.json(
      { 
        success: true,
        message: 'Votre demande de réservation a été envoyée avec succès. Nous vous contacterons très prochainement.',
        data: {
          name,
          email,
          phone,
          treatment: treatmentLabel,
          therapist: therapistLabel,
          date: today.toISOString(),
          reference: reference,
          confirmationDeadline: confirmationDeadline.toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Une erreur est survenue lors de l\'envoi de votre demande de réservation'
      },
      { status: 500 }
    );
  }
}