﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserApiWeb.Date;

#nullable disable

namespace UserApiWeb.Migrations
{
    [DbContext(typeof(DateContext))]
    partial class DateContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("UserApiWeb.Logic.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("userGenderId")
                        .HasColumnType("int");

                    b.Property<string>("userGmail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userTypeGender")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("userGenderId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("UserApiWeb.Logic.userGender", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("typeGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("userGender");
                });

            modelBuilder.Entity("UserApiWeb.Logic.User", b =>
                {
                    b.HasOne("UserApiWeb.Logic.userGender", "userGender")
                        .WithMany()
                        .HasForeignKey("userGenderId");

                    b.Navigation("userGender");
                });
#pragma warning restore 612, 618
        }
    }
}
