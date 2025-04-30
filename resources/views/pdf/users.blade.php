<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        h2 {
            text-align: center;
            color: #2e6da4;
            margin-top: 20px;
            font-size: 24px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        th, td {
            padding: 12px;
            text-align: left;
            font-size: 14px;
        }

        th {
            background-color: #2e6da4;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        td {
            background-color: #f9f9f9;
            border-bottom: 1px solid #ddd;
        }

        tr:nth-child(even) td {
            background-color: #f1f1f1;
        }

        tr:last-child td {
            border-bottom: none;
        }

        /* Responsive Design */
        @media screen and (max-width: 768px) {
            th, td {
                padding: 8px;
                font-size: 12px;
            }

            h2 {
                font-size: 20px;
            }
        }

        /* Printing Styles */
        @media print {
            body {
                margin: 0;
                padding: 0;
                background-color: #fff;
            }

            table {
                border: 1px solid #000;
                box-shadow: none;
                width: 100%;
                font-size: 12px;
            }

            h2 {
                font-size: 22px;
                margin: 0;
            }

            td, th {
                padding: 6px;
                border: 1px solid #ddd;
            }
        }
    </style>
</head>
<body>
    <h2>Users Report</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->fullname }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->usertype }}</td>
                    <td>{{ ucfirst($user->status) }}</td>
                    <td>{{ $user->created_at }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
