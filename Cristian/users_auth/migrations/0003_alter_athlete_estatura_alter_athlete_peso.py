# Generated by Django 4.2.8 on 2024-10-16 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_auth', '0002_discipline_athlete'),
    ]

    operations = [
        migrations.AlterField(
            model_name='athlete',
            name='estatura',
            field=models.FloatField(help_text='Estatura en Centimetros'),
        ),
        migrations.AlterField(
            model_name='athlete',
            name='peso',
            field=models.FloatField(help_text='Peso en Kilogramos'),
        ),
    ]