"""
PDF Report Generator for Analytics
This script generates PDF reports with attendance analytics and charts.
"""

import sys
import json
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import matplotlib.pyplot as plt
import io

def generate_attendance_report(data, output_path):
    """
    Generate a PDF report with attendance analytics
    
    Args:
        data: Dictionary containing attendance data and statistics
        output_path: Path where the PDF will be saved
    """
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    title = Paragraph("Reporte de Asistencia", title_style)
    story.append(title)
    
    # Date
    date_text = Paragraph(
        f"Generado el: {datetime.now().strftime('%d/%m/%Y %H:%M')}",
        styles['Normal']
    )
    story.append(date_text)
    story.append(Spacer(1, 0.5*inch))
    
    # Summary Statistics
    summary_title = Paragraph("Resumen Estadístico", styles['Heading2'])
    story.append(summary_title)
    story.append(Spacer(1, 0.2*inch))
    
    summary_data = [
        ['Métrica', 'Valor'],
        ['Total de Registros', str(data.get('total', 0))],
        ['Presentes', str(data.get('present', 0))],
        ['Ausentes', str(data.get('absent', 0))],
        ['Tardanzas', str(data.get('late', 0))],
        ['Tasa de Asistencia', f"{data.get('attendanceRate', 0)}%"],
    ]
    
    summary_table = Table(summary_data, colWidths=[3*inch, 2*inch])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    story.append(summary_table)
    story.append(Spacer(1, 0.5*inch))
    
    # Student Rankings
    if 'rankings' in data and data['rankings']:
        rankings_title = Paragraph("Top 10 Estudiantes", styles['Heading2'])
        story.append(rankings_title)
        story.append(Spacer(1, 0.2*inch))
        
        rankings_data = [['Rank', 'Nombre', 'Registro', 'Tasa de Asistencia']]
        for i, student in enumerate(data['rankings'][:10], 1):
            rankings_data.append([
                str(i),
                student.get('name', 'N/A'),
                student.get('registrationNumber', 'N/A'),
                f"{student.get('rate', 0):.1f}%"
            ])
        
        rankings_table = Table(rankings_data, colWidths=[0.7*inch, 2.5*inch, 1.5*inch, 1.5*inch])
        rankings_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(rankings_table)
    
    # Build PDF
    doc.build(story)
    return output_path

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)
    
    data_json = sys.argv[1]
    output_path = sys.argv[2]
    
    try:
        data = json.loads(data_json)
        result_path = generate_attendance_report(data, output_path)
        print(json.dumps({"success": True, "path": result_path}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
